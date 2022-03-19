package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Items;
import java.math.BigInteger;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Items, String> {

    Optional<Items> findByTokenId(BigInteger tokenId);
}
