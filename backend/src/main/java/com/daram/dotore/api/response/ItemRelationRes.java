package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Items;
import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemRelationResponse")
public class ItemRelationRes extends BaseRes{

    private List<ItemRelationVO> data=new ArrayList<>();
    public static ItemRelationRes of(String result){
        ItemRelationRes res = new ItemRelationRes();
        res.setResult(result);

        return res;
    }

    public static ItemRelationRes of(String result, List<Items> list){
        ItemRelationRes res = new ItemRelationRes();
        res.setResult(result);
        for (int i=0; i<list.size(); i++){
            res.getData().add(new ItemRelationVO(list.get(i).getTokenId(),list.get(i).getItem_hash()));
        }
        return res;
    }
}
