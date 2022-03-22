package com.daram.dotore.api.service;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Users;
import com.daram.dotore.db.repository.AnswerRepository;
import com.daram.dotore.db.repository.FeedbackRepository;
import com.daram.dotore.db.repository.UserRepository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FeedbackRepository feedRepository;

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

    @Override
    public Users updateNickname(NicknameUpdateReq nicknameUpdateReq) {
        Users user = getUserByAddress(nicknameUpdateReq.getAddress());
        return userRepository.save(user.setNickname(nicknameUpdateReq.getNickname()));
    }

    @Override
    public Users updateDesc(DescUpdateReq descUpdateReq) {
        Users user = getUserByAddress(descUpdateReq.getAddress());
        return userRepository.save(user.setDescription(descUpdateReq.getDescription()));
    }

    @Override
    public Users updateProfile(ProfileUpdateReq profileUpdateReq) {
        Users user = getUserByAddress(profileUpdateReq.getAddress());
        return userRepository.save(user.setProfile_img_url(profileUpdateReq.getProfile_img_url()));
    }

    @Override
    public List<Feedback> getResponseFeedbackList(String address) {
        return feedRepository.findByAddress(address);
    }
}
