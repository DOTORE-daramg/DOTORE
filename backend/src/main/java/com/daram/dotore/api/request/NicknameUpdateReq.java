package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("nicknameUpdateRequest")
public class NicknameUpdateReq {
    String owner_address;
    String nickname;
}
