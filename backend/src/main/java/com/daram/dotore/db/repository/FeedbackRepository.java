package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByAddress(String address);

    @Query(value = "SELECT * "
            + "FROM feedback "
            + "WHERE respondent = :address", nativeQuery = true)
    List<Feedback> getRespondentList(@Param("address") String address);
}
