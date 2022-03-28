package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Likes;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikeRepository extends JpaRepository<Likes, Integer> {

    Optional<Likes> findByAddressAndTokenId(String address, BigInteger tokenId);

    int countByTokenId(BigInteger tokenId);

    @Query(value = "SELECT likes_id,address,token_id "
        + "FROM likes "
        + "WHERE address = :address", nativeQuery = true)
    List<Likes> findLikeByAddress(@Param("address") String address);
}
