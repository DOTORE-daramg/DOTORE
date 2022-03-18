package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Taglist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Taglist, String> {

}
