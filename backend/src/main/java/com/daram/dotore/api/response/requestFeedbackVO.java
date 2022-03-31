package com.daram.dotore.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class requestFeedbackVO {
    int articleNo; //feed
    BigInteger tokenId; //feed
    String itemTitle; //items
    String questioner; //본인의 주소 feed
    String description; //feed
    boolean yn;
    LocalDateTime createdAt; //feed
}
