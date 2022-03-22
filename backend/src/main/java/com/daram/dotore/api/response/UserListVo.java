package com.daram.dotore.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserListVo {

    private String address;
    private String nickname;
    private int acorn;
    private String profile_img_url;
}
