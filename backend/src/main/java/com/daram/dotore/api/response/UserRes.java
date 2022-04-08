package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes extends BaseRes {

    private String address;
    private String nickname;
    private String description;
    private int acorn;
    private String profileImgUrl;

    public static UserRes of(String result, Users user) {
        UserRes res = new UserRes();
        res.setResult(result);
        if (user != null) {
            res.setAddress(user.getAddress());
            res.setNickname(user.getNickname());
            res.setDescription(user.getDescription());
            res.setAcorn(user.getAcorn());
            res.setProfileImgUrl(user.getProfileImgUrl());
        }
        return res;
    }
}
