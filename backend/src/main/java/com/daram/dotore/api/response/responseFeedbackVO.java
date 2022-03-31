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
    int articleNo;
    String itemTitle;
    String questioner;
    String description;
    boolean yn;
    LocalDateTime createdAt;
    BigInteger tokenId;
}
