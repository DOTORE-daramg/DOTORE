package com.daram.dotore.api.service;

import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.db.entity.Sales;

import java.math.BigInteger;

public interface SaleService {

    Sales saveNewSales(SalesReq salesReq);

    Sales getEmptyCompletedAtItem(BigInteger token_id);
}
