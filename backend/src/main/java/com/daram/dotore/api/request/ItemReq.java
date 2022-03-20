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

    private BigInteger tokenId;
    private String item_hash;
    private String item_title;
    private String item_description;
    private LocalDateTime created_at;
    private String author_address;
    private String owner_address;
    private Boolean is_first;
    private String format;
    private String[] tags;
    private BigInteger[] original;
}
