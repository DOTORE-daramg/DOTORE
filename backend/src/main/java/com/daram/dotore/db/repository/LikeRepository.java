package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Likes;
import java.math.BigInteger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Likes, Integer> {
    int countByTokenId(BigInteger tokenId);
}
