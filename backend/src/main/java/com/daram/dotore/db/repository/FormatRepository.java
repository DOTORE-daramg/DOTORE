package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Format;
import java.math.BigInteger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormatRepository extends JpaRepository<Format, BigInteger> {

}
