package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.ItemButtonReq;
import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemTrxReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.ItemButtonRes;
import com.daram.dotore.api.response.ItemDetailRes;
import com.daram.dotore.api.response.ItemImageRes;
import com.daram.dotore.api.response.ItemLikeRes;
import com.daram.dotore.api.response.ItemListRes;
import com.daram.dotore.api.response.ItemRelationRes;
import com.daram.dotore.api.response.ItemsRes;
import com.daram.dotore.api.service.AwsS3Service;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@Api(value = "NFT 작품 관련 API")
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @Autowired
    UserService userService;

    @Autowired
    AwsS3Service awsS3Service;

    @PostMapping("/mint/upload")
    @ApiOperation(value = "민팅 전 파일 업로드", notes = "민팅 버튼을 누르면 파일을 s3 서버에 먼저 업로드하고 그 url을 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemImageRes.class),
        @ApiResponse(code = 400, message = "Fail", response = ItemImageRes.class),
    })
    public ResponseEntity<BaseRes> upload(@RequestPart("data") MultipartFile file) {
        try {
            String imageUrl = awsS3Service.BeforeMint(file, "items");
            return ResponseEntity.status(200).body(ItemImageRes.of("Success", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(ItemImageRes.of("Fail"));
        }
    }

    @PostMapping("/mint/before")
    @ApiOperation(value = "민팅 시작시 정보 전달", notes = "민팅 버튼을 누르면 token_id를 제외한 다른 정보들을 전달해서 DB에 추가")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> beforeMint(@RequestBody ItemReq itemReq) {
        try {
            itemService.saveNewItem(itemReq);
            return ResponseEntity.status(200).body(BaseRes.of("Success"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseRes.of("Fail"));
        }
    }

    @GetMapping("/mint/{address}")
    @ApiOperation(value = "해당 유저 address로 Pending중인 민팅 트랜잭션 반환", notes = "DB에 token_id가 비어있는 트랜잭션 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemListRes.class),
        @ApiResponse(code = 400, message = "Fail", response = ItemListRes.class),
    })
    public ResponseEntity<ItemListRes> getPending(@PathVariable String address) {
        try {
            List<Items> list = itemService.getPendingItemList(address);
            if (list.size() == 0) {
                return ResponseEntity.status(201).body(ItemListRes.of("진행중인 트랜잭션이 존재하지 않음", list));
            }
            return ResponseEntity.status(200).body(ItemListRes.of("Success", list));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ItemListRes.of("존재하지 않는 address"));
        }
    }

    @PatchMapping("/mint")
    @ApiOperation(value = "민팅 트랜잭션이 완료되면 token_id와 status 업데이트", notes = "민팅 트랜잭션이 완료되면 token_id와 status 업데이트")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 404, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> updateMint(@RequestBody ItemTrxReq itemTrxReq) {
        Items item = itemService.getItemByTrxHash(itemTrxReq.getItemTrxHash());
        if (item == null) {
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 트랜잭션"));
        }
        itemService.updateMint(itemTrxReq);
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
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

    @GetMapping("/{token_id}")
    @ApiOperation(value = "작품 상세페이지", notes = "작품을 눌러서 나오는 상세페이지에 필요한 정보 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemDetailRes.class),
        @ApiResponse(code = 404, message = "존재하지 않는 token_id", response = ItemDetailRes.class),
    })
    public ResponseEntity<ItemDetailRes> getDetail(@PathVariable BigInteger token_id) {
        try {
            Items item = itemService.getItemByTokenId(token_id);
            Users user = userService.getUserByAddress(item.getOwner_address());
            int download = itemService.countDownload(token_id);
            int like = itemService.countLike(token_id);
            String[] tags = itemService.getTags(token_id);
            return ResponseEntity.status(200)
                .body(ItemDetailRes.of("Success", item, user, download, like, tags));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ItemDetailRes.of("존재하지 않는 token_id"));
        }
    }

    @GetMapping("/like/{token_id}/{address}")
    @ApiOperation(value = "좋아요 여부 확인", notes = "해당 유저가 이 작품에 좋아요를 눌렀는지 확인")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = ItemLikeRes.class),
        @ApiResponse(code = 400, message = "Fail", response = ItemLikeRes.class),
    })
    public ResponseEntity<ItemLikeRes> getDetail(@PathVariable BigInteger token_id,
        @PathVariable String address) {
        try {
            boolean like = itemService.checkLike(address, token_id);
            return ResponseEntity.status(200)
                .body(ItemLikeRes.of("Success", like));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(ItemLikeRes.of("Fail"));
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

    @PostMapping("/dislike")
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

        Download download = itemService.getDownload(itemButtonReq.getAddress(),
            itemButtonReq.getTokenId());
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
        ItemsRes itemsRes = itemService.getAll();
        if (itemsRes == null) {
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
        ItemsRes itemsRes = itemService.getFirst();
        if (itemsRes == null) {
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
        ItemsRes itemsRes = itemService.getSecond();
        if (itemsRes == null) {
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
        ItemsRes itemsRes = itemService.getSale();
        if (itemsRes == null) {
            return ResponseEntity.status(404).body(ItemsRes.of("아무 작품도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(itemsRes);
    }
}
