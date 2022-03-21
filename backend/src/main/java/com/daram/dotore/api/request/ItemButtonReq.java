package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemButtonRequest")
public class ItemButtonReq {

    private String address;
    private BigInteger tokenId;
}
