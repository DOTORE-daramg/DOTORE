package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemLikeResponse")
public class ItemLikeRes extends BaseRes {

    private Boolean isLike;

    public static ItemLikeRes of(String result) {
        ItemLikeRes res = new ItemLikeRes();
        res.setResult(result);
        return res;
    }

    public static ItemLikeRes of(String result, boolean like) {
        ItemLikeRes res = new ItemLikeRes();
        res.setResult(result);
        res.setIsLike(like);
        return res;
    }
}
