package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Taglist;
import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<Taglist, Integer> {
    List<Taglist> findByTokenId(BigInteger tokenId);

    List<Taglist> findByItemTrxHash(String itemTrxHash);

    @Modifying
    @Query(value = "UPDATE taglist "
        + "SET token_id = :tokenId "
        + "WHERE item_trx_hash = :itemTrxHash", nativeQuery = true)
    int updateTokenId(@Param("itemTrxHash") String itemTrxHash, @Param("tokenId") BigInteger tokenId);
}
