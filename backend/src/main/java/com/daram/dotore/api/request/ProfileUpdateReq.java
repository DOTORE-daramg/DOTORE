package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ProfileUpdateRequest")
public class ProfileUpdateReq {
    String address;
    String profileImgUrl;
}
