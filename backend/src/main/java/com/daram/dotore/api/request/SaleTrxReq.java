package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SaleTransactionRequest")
public class SaleTrxReq {

    private String saleTrxHash;
    private int saleId;
}
