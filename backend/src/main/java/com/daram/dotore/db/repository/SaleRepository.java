package com.daram.dotore.db.repository;

import com.daram.dotore.api.request.SalesCancelReq;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Sales;
import java.math.BigInteger;
import java.text.Bidi;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public interface SaleRepository extends JpaRepository<Sales, Integer> {
    Optional<Sales> findByTokenIdAndSaleYn(BigInteger tokenId, boolean saleYn);
    Optional<Sales> findByTokenId(BigInteger tokenId);

    @Query(value = "SELECT sale_id, sale_contract_address,cash_contract_address,sale_yn,seller_address,buyer_address,price,created_at,completed_at,token_id "
            + "FROM Sales "
            + "WHERE token_id = :token_id "
            + "AND completed_at is null ", nativeQuery = true)
    Sales getEmptyCompletedAtItem(@Param("token_id") BigInteger token_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Sales "
            + "WHERE token_id = :tokenId "
            + "AND seller_address = :address "
            + "AND completed_at is null ", nativeQuery = true)
    void findDelete(@Param("tokenId") BigInteger tokenId, @Param("address") String address);
}
