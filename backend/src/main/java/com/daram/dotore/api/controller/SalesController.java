package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.FeedbackRes;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.api.service.SaleService;
import com.daram.dotore.db.entity.Sales;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@CrossOrigin("*")
@Api(value = "작품 판매 API")
@RestController
@RequestMapping("/api/sales")
public class SalesController {

    @Autowired
    SaleService saleService;

    @Autowired
    ItemService itemService;

    @PostMapping
    @ApiOperation(value = "판매 정보 등록", notes = "판매 정보 등록")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> makeSales(@RequestBody SalesReq salesReq)
        throws Exception {
        try {
            //토큰 아이디 검색
            BigInteger tokenId = salesReq.getTokenId(); //2
            //작품 테이블에서 tokenId로 검색해서 on_sale_yn true로 업데이트
            itemService.updateOnSaleYn(tokenId);
            Sales sales = saleService.saveNewSales(salesReq);
            return ResponseEntity.status(200)
                    .body(BaseRes.of("Success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseRes.of("Fail"));
        }
    }
}
