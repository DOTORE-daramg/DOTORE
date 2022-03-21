package com.daram.dotore.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DescUpdateRequest")
public class DescUpdateReq {
    String address;
    String description;
}
