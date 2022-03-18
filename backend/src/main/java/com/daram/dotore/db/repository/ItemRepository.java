package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Items;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Items, String> {

}
