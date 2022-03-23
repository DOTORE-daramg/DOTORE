package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.SaleCompleteReq;
import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.FeedbackRes;
import com.daram.dotore.api.response.ItemAuthorListRes;
import com.daram.dotore.api.response.SalesInfoRes;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.api.service.SaleService;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Sales;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

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

    @GetMapping("/{token_id}")
    @ApiOperation(value = "판매 정보 상세 조회", notes = "판매 정보 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = SalesInfoRes.class),
    })
    public ResponseEntity<SalesInfoRes> salesInfo(@PathVariable BigInteger token_id) {
        try {
            //token_id를 바탕으로 completed_at이 비어있는(거래가 되지 않은) 작품 조회
            Sales item = saleService.getEmptyCompletedAtItem(token_id);
            return ResponseEntity.status(200).body(SalesInfoRes.of("Success", item));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(SalesInfoRes.of("존재하지 않는 token_id"));
        }
    }

    @PatchMapping("/complete")
    @ApiOperation(value = "판매 완료", notes = "판매 완료")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> saleComplete(@RequestBody SaleCompleteReq saleCompleteReq) {
        try{
            //작품 테이블에서 해당 token_id 로우를 업데이트한다
            //on_sale_yn > false, owner_address > 구매자 address
            itemService.updateOnSaleYnAndOwnerAddress(saleCompleteReq);

            //판매 테이블에서 다음 항목 업데이트
            //sale_yn=true
            //buyer_address
            //completed_at
            saleService.updateSaleYnAndBuyerAddressAndCompletedAt(saleCompleteReq);
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(BaseRes.of("판매 실패"));
        }
    }
}
