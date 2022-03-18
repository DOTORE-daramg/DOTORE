package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "NFT 작품 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping()
    @ApiOperation(value = "민팅", notes = "DB에 해당 NFT 작품 정보 저장")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 500, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> login(@RequestBody ItemReq itemReq) {

        try{
            Items item=itemService.saveNewItem(itemReq);
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        }catch(Exception e){
            return ResponseEntity.status(500).body(BaseRes.of("Fail"));
        }
    }
}
