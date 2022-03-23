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
    private BigInteger tokenId;
    private  String item_hash;
    private String item_title;
    private  String item_description;
    private LocalDateTime created_at;
    private String owner_address;
    //is_first를 사용하는 곳은 없지만 일단 그냥 넘겨주는걸로...
    private  Boolean is_first;
}
