package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@ApiModel("SalesRequest")
public class SalesReq {

    private String saleTrxHash;
    private BigInteger tokenId;
    private String sellerAddress;
    private String cashContractAddress;
    private String price;
}
