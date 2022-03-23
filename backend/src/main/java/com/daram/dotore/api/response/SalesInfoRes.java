package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Sales;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("SalesInfoResponse")
public class SalesInfoRes extends BaseRes{

    private String cashContractAddress;
    private LocalDateTime created_at;
    private String saleContractAddress;
    private int saleId;
    private Boolean saleYn;
    private String sellerAddress;
    private BigInteger tokenId;
    private String price;

    LocalDateTime completed_at;

    public static SalesInfoRes of(String result) {
        SalesInfoRes res = new SalesInfoRes();
        res.setResult(result);
        return res;
    }

    public static SalesInfoRes of(String result, Sales item) {
        SalesInfoRes res = new SalesInfoRes();
        res.setResult(result);
        res.setCashContractAddress(item.getCashContractAddress());
        res.setCreated_at(item.getCreated_at());
        res.setSaleContractAddress(item.getSaleContractAddress());
        res.setSaleId(item.getSaleId());
        res.setSaleYn(item.getSaleYn());
        res.setSellerAddress(item.getSellerAddress());
        res.setTokenId(item.getTokenId());
        res.setPrice(item.getPrice());
        return res;
    }
}
