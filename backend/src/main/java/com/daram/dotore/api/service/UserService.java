package com.daram.dotore.api.service;

import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.db.entity.Users;

public interface UserService {

    Users getUserByAddress(String address);

    Users saveNewUser(String address);

    Users updateNickname(NicknameUpdateReq nicknameUpdateReq);
}
