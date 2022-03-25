package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnswerRequest")
public class AnswerReq {

    private int articleNo;
    private String writer;
    private String description;
    private String imgUrl;
}
