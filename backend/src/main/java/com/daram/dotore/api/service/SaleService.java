package com.daram.dotore.api.service;

import com.daram.dotore.api.request.SaleCompleteReq;
import com.daram.dotore.api.request.SaleTrxReq;
import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.db.entity.Sales;

import java.math.BigInteger;
import java.util.List;

public interface SaleService {

    Sales saveNewSales(SalesReq salesReq);

    Sales updateSale(SaleTrxReq saleTrxReq);

    Sales getEmptyCompletedAtItem(BigInteger token_id);

    Sales updateSaleYnAndBuyerAddressAndCompletedAt(SaleCompleteReq saleCompleteReq);

    void deleteCompletedAt(BigInteger tokenId, String address);

    List<Sales> getPendingSaleList(String address);

    Sales getSaleByTrxHash(String saleTrxHash);
}
