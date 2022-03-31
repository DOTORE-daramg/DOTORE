package com.daram.dotore.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemImageResponse")
public class ItemImageRes extends BaseRes{

    private String imageUrl;

    public static ItemImageRes of(String result) {
        ItemImageRes res = new ItemImageRes();
        res.setResult(result);
        return res;
    }

    public static ItemImageRes of(String result, String imageUrl) {
        ItemImageRes res = new ItemImageRes();
        res.setResult(result);
        res.setImageUrl(imageUrl);
        return res;
    }
}
