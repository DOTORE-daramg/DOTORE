package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnswerRequest")
public class AnswerReq {

    private int articleno;
    private String writer;
    private String description;
    private String img_url;
}
