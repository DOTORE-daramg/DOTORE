package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnswerRequest")
public class AnswerReq {

    private BigInteger articleno;
    private String writer;
    private String description;
    private String img_url;
}
