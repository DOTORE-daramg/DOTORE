package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NicknameUpdateRequest")
public class NicknameUpdateReq {
    private String owner_address;
    private String nickname;
}
