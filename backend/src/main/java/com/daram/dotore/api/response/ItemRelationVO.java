package com.daram.dotore.api.response;

import java.math.BigInteger;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemRelationVO {

    private BigInteger tokenId;
    private String itemHash;
}
