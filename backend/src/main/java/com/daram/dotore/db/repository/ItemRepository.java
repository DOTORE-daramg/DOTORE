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

    Optional<Items> findByItemTrxHash(String itemTrxHash);

    List<Items> findByStatusOrderByTokenIdDesc(String status);

    List<Items> findByIsFirstAndStatusOrderByTokenIdDesc(boolean isFirst, String status);

    List<Items> findByOnSaleYnOrderByTokenIdDesc(boolean onSaleYn);

    @Query(value =
        "SELECT i.item_trx_hash, i.token_id, i.item_hash, i.item_title, i.item_description, i.created_at, i.author_address, i.owner_address, i.on_sale_yn, i.is_first, i.format, i.status "
            + "FROM items i JOIN secondary s ON i.token_id=s.token_id "
            + "WHERE s.original = :ori "
            + "ORDER BY i.token_id Desc", nativeQuery = true)
    List<Items> getSecond(@Param("ori") BigInteger original);

    @Query(value =
        "SELECT i.item_trx_hash, i.token_id, i.item_hash, i.item_title, i.item_description, i.created_at, i.author_address, i.owner_address, i.on_sale_yn, i.is_first, i.format, i.status "
            + "FROM items i JOIN secondary s ON i.token_id=s.original "
            + "WHERE s.token_id = :tokenId "
            + "ORDER BY i.token_id Desc", nativeQuery = true)
    List<Items> getFirst(@Param("tokenId") BigInteger tokenId);

    @Query(value = "SELECT * "
        + "FROM items "
        + "WHERE owner_address = :address "
        + "ORDER BY token_id Desc", nativeQuery = true)
    List<Items> getItemList(@Param("address") String address);

    @Query(value = "SELECT * "
        + "FROM items "
        + "WHERE author_address = :address and token_id is null "
        + "ORDER BY token_id Desc", nativeQuery = true)
    List<Items> getPendingItemList(@Param("address") String address);

    @Query(value = "SELECT * "
        + "FROM items "
        + "WHERE author_address = :address "
        + "ORDER BY token_id Desc", nativeQuery = true)
    List<Items> getAuthorItemList(@Param("address") String address);

    @Query(value = "SELECT * "
        + "FROM items "
        + "ORDER BY token_id desc "
        + "LIMIT :pageNum, 12", nativeQuery = true)
    List<Items> getRecentItemList(@Param("pageNum") int pageNum);

    @Query(value = "SELECT * "
        + "FROM items "
        + "WHERE is_first = :isFirst "
        + "ORDER BY token_id desc "
        + "LIMIT :pageNum, 12", nativeQuery = true)
    List<Items> getRecentItemListByIsFirst(@Param("isFirst") boolean isFirst, @Param("pageNum") int pageNum);

    @Query(value = "SELECT i.item_trx_hash, i.token_id, i.item_hash, i.item_title, i.item_description, i.created_at, i.author_address, i.owner_address, i.on_sale_yn, i.is_first, i.format, i.status "
        + "FROM items i left join "
        + "(SELECT token_id, count(token_id) like_cnt "
        + "FROM likes "
        + "GROUP BY token_id) s "
        + "ON i.token_id = s.token_id "
        + "WHERE status = \"Success\" "
        + "ORDER BY like_cnt DESC, i.token_id "
        + "LIMIT :pageNum, 12", nativeQuery = true)
    List<Items> getFavoriteItemList(@Param("pageNum") int pageNum);

    @Query(value = "SELECT i.item_trx_hash, i.token_id, i.item_hash, i.item_title, i.item_description, i.created_at, i.author_address, i.owner_address, i.on_sale_yn, i.is_first, i.format, i.status "
        + "FROM items i left join "
        + "(SELECT token_id, count(token_id) like_cnt "
        + "FROM likes "
        + "GROUP BY token_id) s "
        + "ON i.token_id = s.token_id "
        + "WHERE status = \"Success\" AND is_first = :isFirst "
        + "ORDER BY like_cnt DESC, i.token_id "
        + "LIMIT :pageNum, 12", nativeQuery = true)
    List<Items> getFavoriteItemListByIsFirst(@Param("isFirst") boolean isFirst, @Param("pageNum") int pageNum);
}
