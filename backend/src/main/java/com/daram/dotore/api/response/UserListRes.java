package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.ApiModel;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserListResponse")
public class UserListRes extends BaseRes {

    List<Users> data=new ArrayList<>();

    public static UserListRes of(String result, List<Users> list) {
        UserListRes res = new UserListRes();
        res.setResult(result);
        res.setData(list);
        return res;
    }
}
