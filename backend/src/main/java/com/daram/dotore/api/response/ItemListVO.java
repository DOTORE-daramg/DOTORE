package com.daram.dotore.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ItemListVO {
    private String itemTrxHash;
    private BigInteger tokenId;
    private  String itemHash;
    private String itemTitle;
    private  String itemDescription;
    private LocalDateTime createdAt;
    private String ownerAddress;
    //is_first를 사용하는 곳은 없지만 일단 그냥 넘겨주는걸로...
    private Boolean isFirst;
    private String status;
}
