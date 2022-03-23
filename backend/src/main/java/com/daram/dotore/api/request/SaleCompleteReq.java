package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@ApiModel("SaleCompleteRequest")
public class SaleCompleteReq {

    BigInteger tokenId;
    String buyerAddress;
}
