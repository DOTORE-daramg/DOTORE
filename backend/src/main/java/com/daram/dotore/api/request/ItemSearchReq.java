package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemSearchRequest")
public class ItemSearchReq {

    private String word;
    private String type;
}
