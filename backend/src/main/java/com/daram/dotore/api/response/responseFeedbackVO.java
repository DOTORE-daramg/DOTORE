package com.daram.dotore.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class responseFeedbackVO {
    int articleno;
    String item_title;
    String questioner;
    String description;
    boolean YN;
    LocalDateTime created_at;
    BigInteger tokenId;
}
