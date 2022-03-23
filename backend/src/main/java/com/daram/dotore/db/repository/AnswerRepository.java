package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Answer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    List<Answer> findByArticleno(int articleno);

    @Query(value = "SELECT COUNT(*) "
        + "FROM answer "
        + "WHERE articleno = :articleNo", nativeQuery = true)
    Integer getCount(@Param("articleNo") int articleNo);

    @Query(value = "SELECT COUNT(*) "
        + "FROM feedback "
        + "WHERE address = :address", nativeQuery = true)
    Integer getRequestCount(@Param("address") String address);
}
