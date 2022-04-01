package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ProfileUpdateRequest")
public class ProfileUpdateReq {

    String address;
    String profileImgUrl;
}
