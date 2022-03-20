package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, String> {

    Optional<Users> findByAddress(String address);
}
