package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemPageRequest")
public class ItemPageReq {

    int pageNum;
    int sort;
    String type;
    String search;
}