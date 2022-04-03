package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.SaleCompleteReq;
import com.daram.dotore.api.request.SaleTrxReq;
import com.daram.dotore.api.request.SalesCancelReq;
import com.daram.dotore.api.request.SalesReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.SaleListRes;
import com.daram.dotore.api.response.SalesInfoRes;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.api.service.SaleService;
import com.daram.dotore.db.entity.Sales;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
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

    @PostMapping("/before")
    @ApiOperation(value = "판매 등록 요청", notes = "트랜잭션을 포함한 판매 정보 등록")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> beforeSale(@RequestBody SalesReq salesReq)
        throws Exception {
        try {
            saleService.saveNewSales(salesReq);
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseRes.of("Fail"));
        }
    }

    @PostMapping("/{address}")
    @ApiOperation(value = "해당 유저 address로 Pending중인 판매 트랜잭션 반환", notes = "DB에 sale_id가 비어있는 트랜잭션 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<SaleListRes> getPending(@PathVariable String address)
        throws Exception {
        try {
            List<Sales> list = saleService.getPendingSaleList(address);
            if (list.size() == 0) {
                return ResponseEntity.status(201).body(SaleListRes.of("진행중인 트랜잭션이 존재하지 않음", list));
            }
            return ResponseEntity.status(200).body(SaleListRes.of("Success", list));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(SaleListRes.of("존재하지 않는 address"));
        }
    }

    @PatchMapping
    @ApiOperation(value = "판매 등록 트랜잭션이 완료되면 sale_id와 status 업데이트", notes = "판매 등록 성공시 sale_id 및 yn 업데이트")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> updateSale(@RequestBody SaleTrxReq saleTrxReq)
        throws Exception {
        Sales sale = saleService.getSaleByTrxHash(saleTrxReq.getSaleTrxHash());
        if (sale == null) {
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 트랜잭션"));
        }

        BigInteger tokenId = sale.getTokenId();
        itemService.updateOnSaleYn(tokenId);
        saleService.updateSale(saleTrxReq);
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
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
        try {
            //작품 테이블에서 해당 token_id 로우를 업데이트한다
            //on_sale_yn > false, owner_address > 구매자 address
            itemService.updateOnSaleYnAndOwnerAddress(saleCompleteReq);

            //판매 테이블에서 다음 항목 업데이트
            //sale_yn=false
            //buyer_address
            //completed_at
            saleService.updateSaleYnAndBuyerAddressAndCompletedAt(saleCompleteReq);
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseRes.of("판매 실패"));
        }
    }

    @PostMapping("/cancel")
    @ApiOperation(value = "판매 취소", notes = "판매 취소")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> saleCancel(@RequestBody SalesCancelReq salesCancelReq) {
        try {
            //판매 테이블에서 token_id로 completed_at이 비어있는 row 삭제
            //전달받은 address와 seller_address가 같으면서
            String address = salesCancelReq.getAddress();
            BigInteger tokenId = salesCancelReq.getTokenId();
            saleService.deleteCompletedAt(tokenId, address);

            //작품 테이블에서 해당 token_id로 on_sale_yn > false 업데이트
            itemService.updateCancelOnSaleYn(salesCancelReq.getTokenId());
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseRes.of("판매취소 실패"));
        }
    }
}
