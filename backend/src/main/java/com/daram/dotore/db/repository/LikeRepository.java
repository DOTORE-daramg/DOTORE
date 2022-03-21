package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Likes;
import java.math.BigInteger;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Likes, Integer> {

    Optional<Likes> findByAddressAndTokenId(String address, BigInteger tokenId);
    int countByTokenId(BigInteger tokenId);
}
