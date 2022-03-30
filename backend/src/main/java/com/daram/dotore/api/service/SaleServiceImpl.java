package com.daram.dotore.api.service;

import com.daram.dotore.api.request.SaleCompleteReq;
import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.db.entity.Sales;
import com.daram.dotore.db.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SaleServiceImpl implements SaleService{

    @Autowired
    SaleRepository saleRepository;

    @Override
    public Sales saveNewSales(SalesReq salesReq) {
        return saleRepository.save(Sales.builder()
                .tokenId(salesReq.getTokenId())
                .sellerAddress(salesReq.getSellerAddress())
                .cashContractAddress(salesReq.getCashContractAddress())
                .price(salesReq.getPrice())
                .created_at(LocalDateTime.now())
                .saleYn(false)
                .build());
    }

    @Override
    public Sales getEmptyCompletedAtItem(BigInteger token_id) {
        return saleRepository.getEmptyCompletedAtItem(token_id);
    }

    @Override
    public Sales updateSaleYnAndBuyerAddressAndCompletedAt(SaleCompleteReq saleCompleteReq) {
        BigInteger tokenId = saleCompleteReq.getTokenId();
        Optional<Sales> item = saleRepository.findByTokenId(tokenId);
        if(!item.isPresent()){
            return null;
        }
        item.get().setOnSaleYn(false);
        item.get().setBuyerAddress(saleCompleteReq.getBuyerAddress());
        item.get().setCompletedAt(LocalDateTime.now());
        return saleRepository.save(item.get());
    }

    @Override
    public void deleteCompletedAt(BigInteger tokenId,String address) {
        saleRepository.findDelete(tokenId,address);
    }
}
