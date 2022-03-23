package com.daram.dotore.api.service;

import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.db.entity.Sales;

public interface SaleService {

    Sales saveNewSales(SalesReq salesReq);
}
