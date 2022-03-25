package com.daram.dotore.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackVO {

    private int articleNo;
    private String questioner;
    private String description;
    private boolean yn;
    private String nickname;
}
