package com.daram.dotore.api.service;

import com.daram.dotore.api.request.FeedbackReq;
import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Sales;
import com.daram.dotore.db.repository.FeedbackRepository;
import com.daram.dotore.db.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SaleServiceImpl implements SaleService{

    @Autowired
    SaleRepository saleRepository;

    @Override
    public Sales saveNewSales(SalesReq salesReq) {
        return saleRepository.save(Sales.builder()
                .tokenId(salesReq.getTokenId())
                .sellerAddress(salesReq.getSeller_address())
                .saleContractAddress(salesReq.getSales_contract_address())
                .cashContractAddress(salesReq.getCash_contract_address())
                .price(salesReq.getPrice())
                .created_at(LocalDateTime.now())
                .saleYn(false)
                .build());
    }
}
