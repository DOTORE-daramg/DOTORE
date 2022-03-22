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

    List<UserListVo> data=new ArrayList<>();

    public static UserListRes of(String result, List<Users> list) {
        UserListRes res = new UserListRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData().add(new UserListVo(list.get(i).getAddress(), list.get(i).getNickname(),
                list.get(i).getAcorn(), list.get(i).getProfile_img_url()));
        }
        return res;
    }
}
