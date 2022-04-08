package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemButtonResponse")
public class ItemButtonRes extends BaseRes {

    private int count;

    public static ItemButtonRes of(String result) {
        ItemButtonRes res = new ItemButtonRes();
        res.setResult(result);
        return res;
    }

    public static ItemButtonRes of(String result, int count) {
        ItemButtonRes res = new ItemButtonRes();
        res.setResult(result);
        res.setCount(count);
        return res;
    }
}
