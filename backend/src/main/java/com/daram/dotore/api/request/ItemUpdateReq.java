package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemUpdateRequest")
public class ItemUpdateReq {
    private BigInteger tokenId;
    private String ownerAddress;
}
