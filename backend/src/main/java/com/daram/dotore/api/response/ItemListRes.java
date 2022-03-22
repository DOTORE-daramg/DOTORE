package com.daram.dotore.api.response;

import com.daram.dotore.api.service.UserService;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("ItemListResponse")
public class ItemListRes extends BaseRes {

    private List<ItemListVO> data = new ArrayList<>();

    public static ItemListRes of(String result) {
        ItemListRes res = new ItemListRes();
        res.setResult(result);

        return res;
    }

    public static ItemListRes of(String result, List<Items> list) {
        ItemListRes res = new ItemListRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData()
                .add(new ItemListVO(
                        //nickname,
                        list.get(i).getTokenId(),
                        list.get(i).getItem_hash(),
                        list.get(i).getItem_title(),
                        list.get(i).getItem_description(),
                        list.get(i).getCreated_at(),
                        list.get(i).getOwner_address(),
                        list.get(i).getIsFirst()
                ));
        }
        return res;
    }
}
