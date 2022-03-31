package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Taglist;
import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Taglist, Integer> {
    List<Taglist> findByTokenId(BigInteger tokenId);

    @Modifying
    @Query(value = "UPDATE Taglist "
        + "SET token_id = :tokenId "
        + "WHERE item_trx_hash = :itemTrxHash", nativeQuery = true)
    int updateTokenId(String itemTrxHash, BigInteger tokenId);
}
