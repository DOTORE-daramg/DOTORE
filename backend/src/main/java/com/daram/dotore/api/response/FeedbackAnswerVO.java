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
    private LocalDateTime created_at;
    private String img_url;
    private String profile_img_url;
}
