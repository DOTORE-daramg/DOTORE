package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("RequestFeedbackResponse")
public class requestFeedbackRes extends BaseRes {

    private List<requestFeedbackVO> data = new ArrayList<>();

    public static requestFeedbackRes of(String result) {
        requestFeedbackRes res = new requestFeedbackRes();
        res.setResult(result);

        return res;
    }

    public static requestFeedbackRes of(String result, List<Feedback> list, List<Items> list2, List<Boolean> booleanList) {
        requestFeedbackRes res = new requestFeedbackRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData()
                .add(new requestFeedbackVO(
                    list.get(i).getArticleno(),
                    list.get(i).getTokenId(),
                    list2.get(i).getItemTitle(),
                    list.get(i).getAddress(),
                    list.get(i).getDescription(),
                    booleanList.get(i),
                    list.get(i).getCreatedAt()
                ));
        }
        return res;
    }
}
