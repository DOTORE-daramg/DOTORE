package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Feedback;
import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    List<Feedback> findByTokenId(BigInteger tokenId);

    List<Feedback> findByAddress(String address);

    @Query(value = "SELECT * "
        + "FROM feedback "
        + "WHERE respondent = :address", nativeQuery = true)
    List<Feedback> getRespondentList(@Param("address") String address);

    Feedback findByArticleno(int articleno);
}
