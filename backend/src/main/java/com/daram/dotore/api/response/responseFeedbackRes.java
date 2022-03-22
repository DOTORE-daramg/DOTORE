package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("ResponseFeedbackRes")
public class responseFeedbackRes extends BaseRes {

    private List<responseFeedbackVO> data = new ArrayList<>();

    public static responseFeedbackRes of(String result) {
        responseFeedbackRes res = new responseFeedbackRes();
        res.setResult(result);

        return res;
    }

    public static responseFeedbackRes of(String result, List<Feedback> list,List<Items> list2,List<Boolean> booleanList) {
        responseFeedbackRes res = new responseFeedbackRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData()
                .add(new responseFeedbackVO(
                    list.get(i).getArticleno(),
                    list2.get(i).getItem_title(),
                    list.get(i).getAddress(),
                    list.get(i).getDescription(),
                    booleanList.get(i),
                    list.get(i).getCreated_at(),
                    list.get(i).getTokenId()
                ));
        }
        return res;
    }
}
