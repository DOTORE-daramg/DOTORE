package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Answer;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Boolean findByArticleNo(int articleNo);

    @Query(value = "SELECT COUNT(*) "
            + "FROM answer "
            + "WHERE articleno = :articleno", nativeQuery = true)
    List<Integer> getBooleanCountList(@Param("articleno") String address);
}
