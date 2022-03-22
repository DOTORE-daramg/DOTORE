package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Feedback;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedbackListResponse")
public class FeedbackListRes extends BaseRes {

    private List<FeedbackVO> data;

    public static FeedbackListRes of(String result) {
        FeedbackListRes res = new FeedbackListRes();
        res.setResult(result);

        return res;
    }

    public static FeedbackListRes of(String result, List<FeedbackVO> list) {
        FeedbackListRes res = new FeedbackListRes();
        res.setResult(result);
        res.setData(list);
        return res;
    }
}
