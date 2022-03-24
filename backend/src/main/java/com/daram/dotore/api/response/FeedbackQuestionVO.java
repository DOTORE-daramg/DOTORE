package com.daram.dotore.api.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackQuestionVO {

    private String questioner;
    private String description;
    private LocalDateTime createdAt;
    private String imgUrl;
    private String profileImgUrl;
}
