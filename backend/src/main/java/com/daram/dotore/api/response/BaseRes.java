package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BaseResponse")
public class BaseRes {

    @ApiModelProperty(name = "응답 메시지", example = "Success")
    String message = null;

    public BaseRes() {
    }

    public BaseRes(String message) {
        this.message = message;
    }

    public static BaseRes of(String message) {
        BaseRes response = new BaseRes();
        response.message = message;
        return response;
    }
}
