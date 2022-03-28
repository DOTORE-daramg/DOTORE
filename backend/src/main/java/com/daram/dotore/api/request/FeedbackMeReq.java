package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedbackMeRequest")
public class FeedbackMeReq {

    private BigInteger tokenId;
    private String address;
}
