package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Items;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("MyDownloadListResponse")
public class MyLikeListRes extends BaseRes {

    private List<ItemListVO> data = new ArrayList<>();

    public static MyLikeListRes of(String result) {
        MyLikeListRes res = new MyLikeListRes();
        res.setResult(result);

        return res;
    }

    public static MyLikeListRes of(String result, List<Items> list) {
        MyLikeListRes res = new MyLikeListRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData()
                .add(new ItemListVO(
                    list.get(i).getItemTrxHash(),
                    list.get(i).getTokenId(),
                    list.get(i).getItem_hash(),
                    list.get(i).getItem_title(),
                    list.get(i).getItem_description(),
                    list.get(i).getCreated_at(),
                    list.get(i).getOwner_address(),
                    list.get(i).getIsFirst(),
                    list.get(i).getStatus()
                ));
        }
        return res;
    }
}
