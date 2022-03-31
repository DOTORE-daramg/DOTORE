package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Sales;
import io.swagger.annotations.ApiModel;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SaleListResponse")
public class SaleListRes extends BaseRes {

    private List<SaleListVO> data = new ArrayList<>();

    public static SaleListRes of(String result) {
        SaleListRes res = new SaleListRes();
        res.setResult(result);

        return res;
    }

    public static SaleListRes of(String result, List<Sales> list) {
        SaleListRes res = new SaleListRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData()
                .add(new SaleListVO(
                    list.get(i).getSaleTrxHash(),
                    list.get(i).getTokenId(),
                    list.get(i).getCashContractAddress(),
                    list.get(i).getSellerAddress(),
                    list.get(i).getPrice(),
                    list.get(i).getStatus()
                ));
        }
        return res;
    }
}
