package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.ItemButtonReq;
import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.ItemButtonRes;
import com.daram.dotore.api.response.ItemDetailRes;
import com.daram.dotore.api.response.ItemRelationRes;
import com.daram.dotore.api.response.ItemsRes;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.api.service.UserService;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Likes;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.math.BigInteger;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "NFT 작품 관련 API")
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @Autowired
    UserService userService;

    @PostMapping
    @ApiOperation(value = "민팅", notes = "DB에 해당 NFT 작품 정보 저장")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> login(@RequestBody ItemReq itemReq) {

        try {
            itemService.saveNewItem(itemReq);
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseRes.of("Fail"));
        }
    }

    @PatchMapping
    @ApiOperation(value = "작품 소유주 변경", notes = "DB에 해당 NFT 작품의 소유주를 변경")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 404, message = "존재하지 않는 token_id", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> updateItem(@RequestBody ItemUpdateReq itemUpdateReq) {
        Items item = itemService.getItemByTokenId(itemUpdateReq.getTokenId());
        if (item == null) {
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 token_id"));
        }
        itemService.updateOwner(itemUpdateReq);
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
    }

    @GetMapping("/{tokenId}")
    @ApiOperation(value = "작품 상세페이지", notes = "작품을 눌러서 나오는 상세페이지에 필요한 정보 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemDetailRes.class),
        @ApiResponse(code = 404, message = "존재하지 않는 token_id", response = ItemDetailRes.class),
    })
    public ResponseEntity<ItemDetailRes> getDetail(@PathVariable BigInteger tokenId) {
        try {
            Items item = itemService.getItemByTokenId(tokenId);
            Users user = userService.getUserByAddress(item.getOwner_address());
            int download = itemService.countDownload(tokenId);
            int like = itemService.countLike(tokenId);
            String[] tags = itemService.getTags(tokenId);
            return ResponseEntity.status(200)
                .body(ItemDetailRes.of("Success", item, user, download, like, tags));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ItemDetailRes.of("존재하지 않는 token_id"));
        }
    }

    @GetMapping("/relation/{tokenId}")
    @ApiOperation(value = "연관된 작품 조회", notes = "해당 작품의 영감을 준 or 영감을 받은 작품들 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemRelationRes.class),
    })
    public ResponseEntity<ItemRelationRes> getRelation(@PathVariable BigInteger tokenId) {
        try {
            Items item = itemService.getItemByTokenId(tokenId);
            List<Items> list;
            if (item.getIsFirst()) {    // 1차
                list = itemService.getSecond(tokenId);
            } else {  // 2차
                list = itemService.getFirst(tokenId);
            }
            return ResponseEntity.status(200).body(ItemRelationRes.of("Success", list));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(ItemRelationRes.of("존재하지 않는 token_id"));
        }
    }

    @PostMapping("/like")
    @ApiOperation(value = "좋아요 선택", notes = "좋아요 버튼을 누르면 DB에 넣고 좋아요 개수 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemButtonRes.class),
        @ApiResponse(code = 409, message = "이미 좋아요를 눌렀습니다!", response = ItemButtonRes.class),
    })
    public ResponseEntity<ItemButtonRes> like(@RequestBody ItemButtonReq itemButtonReq) {

        Likes like = itemService.getLike(itemButtonReq.getAddress(), itemButtonReq.getTokenId());
        int count = itemService.countLike(itemButtonReq.getTokenId());
        if (like == null) {
            itemService.saveNewLike(itemButtonReq.getAddress(), itemButtonReq.getTokenId());
            count = itemService.countLike(itemButtonReq.getTokenId());
        } else {
            return ResponseEntity.status(409).body(ItemButtonRes.of("이미 좋아요를 눌렀습니다!", count));
        }
        return ResponseEntity.status(200).body(ItemButtonRes.of("Success", count));
    }

    @DeleteMapping("/dislike")
    @ApiOperation(value = "좋아요 취소", notes = "좋아요를 취소하면 DB에서 제거하고 좋아요 개수 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemButtonRes.class),
        @ApiResponse(code = 409, message = "좋아요를 누른 적이 없습니다!", response = ItemButtonRes.class),
    })
    public ResponseEntity<ItemButtonRes> dislike(@RequestBody ItemButtonReq itemButtonReq) {

        Likes like = itemService.getLike(itemButtonReq.getAddress(), itemButtonReq.getTokenId());
        int count = itemService.countLike(itemButtonReq.getTokenId());
        if (like == null) {
            return ResponseEntity.status(409).body(ItemButtonRes.of("좋아요를 누른 적이 없습니다!", count));
        } else {
            itemService.deleteLike(like, itemButtonReq.getAddress(), itemButtonReq.getTokenId());
            count = itemService.countLike(itemButtonReq.getTokenId());
        }
        return ResponseEntity.status(200).body(ItemButtonRes.of("Success", count));
    }

    @PostMapping("/download")
    @ApiOperation(value = "다운로드", notes = "다운로드를 누르면 다운로드 횟수 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemButtonRes.class),
        @ApiResponse(code = 409, message = "이미 다운로드한 적이 있습니다.", response = ItemButtonRes.class),
    })
    public ResponseEntity<ItemButtonRes> download(@RequestBody ItemButtonReq itemButtonReq) {

        Download download=itemService.getDownload(itemButtonReq.getAddress(),itemButtonReq.getTokenId());
        int count = itemService.countDownload(itemButtonReq.getTokenId());
        if (download == null) {
            itemService.saveNewDownload(itemButtonReq.getAddress(), itemButtonReq.getTokenId());
            count = itemService.countDownload(itemButtonReq.getTokenId());
        } else {
            return ResponseEntity.status(409).body(ItemButtonRes.of("이미 다운로드한 적이 있습니다.", count));
        }
        return ResponseEntity.status(200).body(ItemButtonRes.of("Success", count));
    }

    @GetMapping("/all")
    @ApiOperation(value = "모든 작품 목록 조회(view all)", notes = "모든 작품을 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "작품 전체 조회 성공", response = ItemsRes.class),
        @ApiResponse(code = 404, message = "아무 작품도 존재하지 않음", response = ItemsRes.class),
    })
    public ResponseEntity<ItemsRes> getAllItems() {
        ItemsRes itemsRes=itemService.getAll();
        if(itemsRes==null){
            return ResponseEntity.status(404).body(ItemsRes.of("아무 작품도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(itemsRes);
    }

    @GetMapping("/first")
    @ApiOperation(value = "1차 창작물 조회", notes = "모든 1차 창작물 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemsRes.class),
    })
    public ResponseEntity<ItemsRes> getFirstItems() {
        ItemsRes itemsRes=itemService.getFirst();
        if(itemsRes==null){
            return ResponseEntity.status(404).body(ItemsRes.of("아무 작품도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(itemsRes);
    }

    @GetMapping("/second")
    @ApiOperation(value = "2차 창작물 조회", notes = "모든 2차 창작물 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemsRes.class),
    })
    public ResponseEntity<ItemsRes> getSecondItems() {
        ItemsRes itemsRes=itemService.getSecond();
        if(itemsRes==null){
            return ResponseEntity.status(404).body(ItemsRes.of("아무 작품도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(itemsRes);
    }

    @GetMapping("/sale")
    @ApiOperation(value = "판매중인 작품 조회", notes = "판매중인 모든 작품들 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemsRes.class),
    })
    public ResponseEntity<ItemsRes> getSaleItems() {
        ItemsRes itemsRes=itemService.getSale();
        if(itemsRes==null){
            return ResponseEntity.status(404).body(ItemsRes.of("아무 작품도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(itemsRes);
    }
}
