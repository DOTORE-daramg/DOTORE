package com.daram.dotore.api.service;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Likes;
import com.daram.dotore.db.entity.Users;
import com.daram.dotore.db.repository.*;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DownloadRepository downloadRepository;

    @Autowired
    LikeRepository likeRepository;

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
        return userRepository.save(user.setProfileImgUrl(profileUpdateReq.getProfileImgUrl()));
    }

    @Override
    public Users plusAcorn(String address, int amount) {
        Users user = getUserByAddress(address);
        int acorn = user.getAcorn() + amount;
        return userRepository.save(user.setAcorn(acorn));
    }

    @Override
    public List<Users> getUsers() {

        return userRepository.findAll();
    }

    @Override
    public List<Download> getDownloadList(String address) {
        return downloadRepository.findDownloadByAddress(address);
    }

    @Override
    public List<Likes> getLikeList(String address) {
        return likeRepository.findLikeByAddress(address);
    }

}
