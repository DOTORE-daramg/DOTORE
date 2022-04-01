package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("FeedbackRequest")
public class FeedbackReq {

    private BigInteger tokenId;
    private String questioner;
    private String respondent;
    private String description;
    private String imgUrl;
}
