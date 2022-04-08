package com.daram.dotore.api.service;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Likes;
import com.daram.dotore.db.entity.Users;

import java.util.List;

public interface UserService {

    Users getUserByAddress(String address);

    Users saveNewUser(String address);

    Users updateNickname(NicknameUpdateReq nicknameUpdateReq);

    Users updateDesc(DescUpdateReq descUpdateReq);

    Users updateProfile(ProfileUpdateReq profileUpdateReq);

    Users plusAcorn(String address, int amount);

    List<Users> getUsers();

    List<Download> getDownloadList(String address);

    List<Likes> getLikeList(String address);
}
