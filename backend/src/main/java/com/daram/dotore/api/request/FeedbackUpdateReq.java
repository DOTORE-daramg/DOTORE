package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedbackUpdateRequest")
public class FeedbackUpdateReq {
    private int no;
    private String description;
    private String img_url;
}
