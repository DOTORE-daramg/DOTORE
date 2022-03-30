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
    private String imgUrl;

    public FeedbackReq(BigInteger tokenId, String questioner, String respondent, String description, String imgUrl) {
        this.tokenId = tokenId;
        this.questioner = questioner;
        this.respondent = respondent;
        this.description = description;
        this.imgUrl = imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
