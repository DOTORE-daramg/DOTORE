package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Sales;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface SaleRepository extends JpaRepository<Sales, Integer> {

    Optional<Sales> findByTokenIdAndSaleYn(BigInteger tokenId, boolean saleYn);

    Optional<Sales> findByTokenId(BigInteger tokenId);

    Optional<Sales> findBySaleTrxHash(String saleTrxHash);

    @Query(value =
        "SELECT sale_trx_hash, sale_id, token_id, cash_contract_address, sale_yn, seller_address, buyer_address, price, created_at, completed_at, status "
            + "FROM sales "
            + "WHERE token_id = :tokenId "
            + "AND completed_at is null "
            + "ORDER BY token_id", nativeQuery = true)
    Sales getEmptyCompletedAtItem(@Param("tokenId") BigInteger tokenId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM sales "
        + "WHERE token_id = :tokenId "
        + "AND seller_address = :address "
        + "AND completed_at is null ", nativeQuery = true)
    void findDelete(@Param("tokenId") BigInteger tokenId, @Param("address") String address);

    @Query(value = "SELECT * "
        + "FROM sales "
        + "WHERE seller_address = :address and sale_id = 0 "
        + "ORDER BY token_id", nativeQuery = true)
    List<Sales> getPendingItemList(String address);
}
