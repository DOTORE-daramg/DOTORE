package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Answer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByArticleno(int articleno);
}
