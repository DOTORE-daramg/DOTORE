package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@ApiModel("SalesCancelRequest")
public class SalesCancelReq {
    BigInteger tokenId;
    String address;
}
