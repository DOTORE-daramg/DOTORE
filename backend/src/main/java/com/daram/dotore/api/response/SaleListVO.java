package com.daram.dotore.api.response;

import java.math.BigInteger;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SaleListVO {

    private String saleTrxHash;
    private BigInteger tokenId;
    private String cashContractAddress;
    private String sellerAddress;
    private String price;
    private String status;
}
