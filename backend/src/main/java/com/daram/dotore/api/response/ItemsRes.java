package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemsResponse")
public class ItemsRes extends BaseRes{
    private List<ItemDetailRes> data;

    public static ItemsRes of(String result) {
        ItemsRes res = new ItemsRes();
        res.setResult(result);

        return res;
    }

    public static ItemsRes of(String result, List<ItemDetailRes> list) {
        ItemsRes res = new ItemsRes();
        res.setResult(result);
        res.setData(list);
        return res;
    }

}
