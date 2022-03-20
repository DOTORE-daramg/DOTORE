package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Secondary;
import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecondaryRepository extends JpaRepository<Secondary, Integer> {
    List<Secondary> findByOriginal(BigInteger original);
}
