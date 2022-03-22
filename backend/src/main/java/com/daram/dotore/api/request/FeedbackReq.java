package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedbackRequest")
public class FeedbackReq {

    private BigInteger tokenId;
    private String questioner;
    private String respondent;
    private String description;
    private String img_url;
}
