package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Answer;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import io.swagger.annotations.ApiModel;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FeedbackDetailResponse")
public class FeedbackDetailRes extends BaseRes {

    private int articleno;
    private FeedbackQuestionVO question;
    private List<FeedbackAnswerVO> answers = new ArrayList<>();

    public static FeedbackDetailRes of(String result) {
        FeedbackDetailRes res = new FeedbackDetailRes();
        res.setResult(result);

        return res;
    }

    public static FeedbackDetailRes of(String result, Feedback feedback, String profile_img_url,
        List<FeedbackAnswerVO> list) {
        FeedbackDetailRes res = new FeedbackDetailRes();
        res.setResult(result);
        res.setQuestion(new FeedbackQuestionVO(feedback.getAddress(), feedback.getDescription(),
            feedback.getCreated_at(), feedback.getImgUrl(), profile_img_url));
        res.setAnswers(list);
        return res;
    }
}
