package com.daram.dotore.api.service;

import com.daram.dotore.db.entity.Users;
import com.daram.dotore.db.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public Users getUserByAddress(String address) {
        Optional<Users> opt = userRepository.findByAddress(address);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public Users saveNewUser(String address) {
        Users user = userRepository.save(Users.builder()
            .address(address)
            .nickname("도토리")
            .description("")
            .acorn(0)
            .profile_img_url("default")
            .build()
        );

        return user;
    }
}
