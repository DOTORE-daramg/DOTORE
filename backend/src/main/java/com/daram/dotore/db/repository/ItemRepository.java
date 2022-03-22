package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Items;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Items, BigInteger> {

    Optional<Items> findByTokenId(BigInteger tokenId);

    List<Items> findByIsFirst(boolean isFirst);

    @Query(value = "SELECT i.token_id, i.item_hash, i.item_title, i.item_description, i.created_at, i.author_address, i.owner_address, i.on_sale_yn, i.is_first, i.format "
        + "FROM Items i JOIN Secondary s ON i.token_id=s.token_id "
        + "WHERE s.original = :ori", nativeQuery = true)
    List<Items> getSecond(@Param("ori") BigInteger original);

    @Query(value = "SELECT i.token_id, i.item_hash, i.item_title, i.item_description, i.created_at, i.author_address, i.owner_address, i.on_sale_yn, i.is_first, i.format "
        + "FROM Items i JOIN Secondary s ON i.token_id=s.original "
        + "WHERE s.token_id = :tokenId", nativeQuery = true)
    List<Items> getFirst(@Param("tokenId") BigInteger tokenId);

    @Query(value = "SELECT author_name, item_description, item_hash, item_title, owner_address, token_id, created_at "
            + "FROM Items "
            + "WHERE owner_address = :address", nativeQuery = true)
    List<Items> getItemList(@Param("address") String address);
}
