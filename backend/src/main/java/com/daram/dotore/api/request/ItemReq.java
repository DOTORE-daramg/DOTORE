package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemRequest")
public class ItemReq {

    private String itemTrxHash;
    private BigInteger tokenId;
    private String itemHash;
    private String itemTitle;
    private String itemDescription;
    private LocalDateTime createdAt;
    private String authorAddress;
    private Boolean isFirst;
    private String format;
    private String[] tags;
    private BigInteger[] original;
}
