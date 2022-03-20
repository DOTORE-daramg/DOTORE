package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemRelationResponse")
public class ItemRelationRes extends BaseRes{
    class Relation{
        BigInteger tokenId;
        String item_hash;
    }
    private List<Relation> list;

    public static ItemRelationRes of(String result){
        ItemRelationRes res = new ItemRelationRes();
        res.setResult(result);

        return res;
    }

    public static ItemRelationRes of(String result, BigInteger tokenId, String item_hash){
        ItemRelationRes res = new ItemRelationRes();
        res.setResult(result);

        return res;
    }
}
