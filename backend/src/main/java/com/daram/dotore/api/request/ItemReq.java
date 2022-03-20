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

    BigInteger tokenId;
    String item_hash;
    String item_title;
    String item_description;
    LocalDateTime created_at;
    String author_address;
    String owner_address;
    Boolean on_sale_yn;
    Boolean is_first;
    String format;
    String[] tags;
    String[] original;
}
