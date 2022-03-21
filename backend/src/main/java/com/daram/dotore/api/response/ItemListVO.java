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
    //String nickname;
    BigInteger tokenId;
    String item_hash;
    String item_title;
    String item_description;
    LocalDateTime created_at;
    String owner_address;
    Boolean is_first;
}
