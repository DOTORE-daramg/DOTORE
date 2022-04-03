package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedbackResponse")
public class FeedbackRes extends BaseRes{

    private int articleno;

    public static FeedbackRes of(String result) {
        FeedbackRes res = new FeedbackRes();
        res.setResult(result);
        return res;
    }

    public static FeedbackRes of(String result, int articleno) {
        FeedbackRes res = new FeedbackRes();
        res.setResult(result);
        res.setArticleno(articleno);
        return res;
    }
}
