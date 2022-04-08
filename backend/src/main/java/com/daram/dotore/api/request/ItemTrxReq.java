package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemTransactionRequest")
public class ItemTrxReq {

    private String itemTrxHash;
    private BigInteger tokenId;
}
