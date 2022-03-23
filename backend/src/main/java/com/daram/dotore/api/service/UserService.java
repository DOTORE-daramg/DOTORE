package com.daram.dotore.api.service;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Likes;
import com.daram.dotore.db.entity.Users;
import org.springframework.data.relational.core.sql.Like;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Users getUserByAddress(String address);

    Users saveNewUser(String address);

    Users updateNickname(NicknameUpdateReq nicknameUpdateReq);

    Users updateDesc(DescUpdateReq descUpdateReq);

    Users updateProfile(ProfileUpdateReq profileUpdateReq);

    List<Users> getUsers();

    List<Download> getDownloadList(String address);

    List<Likes> getLikeList(String address);
}
