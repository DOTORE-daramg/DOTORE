package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Taglist;
import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Taglist, Integer> {
    List<Taglist> findByTokenId(BigInteger tokenId);
}
