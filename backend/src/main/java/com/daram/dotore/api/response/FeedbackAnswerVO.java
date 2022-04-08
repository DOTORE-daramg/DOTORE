package com.daram.dotore.api.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackAnswerVO {

    private int answerno;
    private String writer;
    private String description;
    private LocalDateTime createdAt;
    private String profileImgUrl;
}
