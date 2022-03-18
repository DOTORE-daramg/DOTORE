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

    BigInteger token_id;
    String item_hash;
    String item_title;
    String item_description;
    LocalDateTime created_at;
    String author_address;
    String owner_address;
    boolean on_sale_yn;
    boolean is_first;
    String[] tags;
    String[] original;
}
