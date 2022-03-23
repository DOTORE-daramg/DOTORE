package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@ApiModel("SalesRequest")
public class SalesReq {

    private BigInteger tokenId;
    private String seller_address;
    private String sales_contract_address;
    private String cash_contract_address;
    private String price;
}
