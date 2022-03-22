package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Feedback;
import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByTokenId(BigInteger tokenId);
}
