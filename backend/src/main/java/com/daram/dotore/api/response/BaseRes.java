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
    private String result = null;

    public BaseRes() {
    }

    public BaseRes(String result) {
        this.result = result;
    }

    public static BaseRes of(String result) {
        BaseRes response = new BaseRes();
        response.result = result;
        return response;
    }
}
