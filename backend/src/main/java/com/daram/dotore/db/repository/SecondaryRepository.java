package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Secondary;
import java.math.BigInteger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SecondaryRepository extends JpaRepository<Secondary, Integer> {

    @Modifying
    @Query(value = "UPDATE Secondary "
        + "SET token_id = :tokenId "
        + "WHERE item_trx_hash = :itemTrxHash", nativeQuery = true)
    int updateTokenId(String itemTrxHash, BigInteger tokenId);
}
