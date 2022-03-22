package com.daram.dotore.api.service;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Users;
<<<<<<< HEAD
import com.sun.org.apache.xpath.internal.operations.Bool;

=======
>>>>>>> 4779687d5f7d72514d6f65d18aa236bc0802c0b8
import java.util.List;

public interface UserService {

    Users getUserByAddress(String address);

    Users saveNewUser(String address);

    Users updateNickname(NicknameUpdateReq nicknameUpdateReq);

    Users updateDesc(DescUpdateReq descUpdateReq);

    Users updateProfile(ProfileUpdateReq profileUpdateReq);

<<<<<<< HEAD
    List<Feedback> getResponseFeedbackList(String address);
=======
    List<Users> getUsers();
>>>>>>> 4779687d5f7d72514d6f65d18aa236bc0802c0b8
}
