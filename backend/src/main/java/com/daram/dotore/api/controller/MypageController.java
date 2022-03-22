package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.api.response.*;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.api.service.UserService;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@CrossOrigin("*")
@Api(value = "마이페이지 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mypage")
public class MypageController {

    @Autowired
    UserService userService;

    @Autowired
    ItemService itemService;

    @GetMapping("/{address}")
    @ApiOperation(value = "마이페이지", notes = "마이페이지에서 회원 정보 가져오기")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = UserRes.class),
        @ApiResponse(code = 404, message = "존재하지 않는 address", response = BaseRes.class),
    })
    public ResponseEntity<UserRes> getUser(@PathVariable String address) {
        Users user = userService.getUserByAddress(address);

        // 존재하지 않은 아이디인 경우 에러
        if (user == null) {
                return ResponseEntity.status(404).body(UserRes.of("존재하지 않는 address",null));
        }
        return ResponseEntity.status(200).body(UserRes.of("Success", user));
    }

    @PatchMapping("/nickname")
    @ApiOperation(value = "닉네임 수정", notes = "마이페이지에서 닉네임 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
            @ApiResponse(code = 404, message = "존재하지 않는 address", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> updateNickname(@RequestBody NicknameUpdateReq nicknameUpdateReq) {
        Users user = userService.getUserByAddress(nicknameUpdateReq.getAddress());

        if(user==null){
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 address"));
        }
        userService.updateNickname(nicknameUpdateReq);
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
    }

    @PatchMapping("/desc")
    @ApiOperation(value = "한줄 소개 수정", notes = "마이페이지에서 한줄 소개 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
            @ApiResponse(code = 404, message = "존재하지 않는 desc", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> updateDesc(@RequestBody DescUpdateReq descUpdateReq) {
        Users user = userService.getUserByAddress(descUpdateReq.getAddress());

        if(user==null){
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 desc"));
        }
        userService.updateDesc(descUpdateReq);
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
    }

    @PatchMapping("/img")
    @ApiOperation(value = "프로필 이미지 변경", notes = "마이페이지에서 프로필 이미지 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
            @ApiResponse(code = 404, message = "존재하지 않는 프로필 이미지 주소", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> updateProfile(@RequestBody ProfileUpdateReq profileUpdateReq) {
        Users user = userService.getUserByAddress(profileUpdateReq.getAddress());

        if(user==null){
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 프로필 이미지"));
        }
        userService.updateProfile(profileUpdateReq);
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
    }

    @GetMapping("/owner/{address}")
    @ApiOperation(value = "특정 주소가 보유한 작품 목록 조회", notes = "특정 주소가 보유한 작품 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = ItemListRes.class),
    })
    public ResponseEntity<ItemListRes> getItemList(@PathVariable String address) {
        try {
            List<Items> list = itemService.getItemList(address);
            //Users user = userService.getUserByAddress(address);
            //String nickname = user.getNickname();
            return ResponseEntity.status(200).body(ItemListRes.of("Success", list));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(ItemListRes.of("존재하지 않는 token_id"));
        }
    }

    @GetMapping("/author/{address}")
    @ApiOperation(value = "특정 주소가 창작한 작품 목록 조회", notes = "특정 주소가 창작한 작품 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = ItemAuthorListRes.class),
    })
    public ResponseEntity<ItemAuthorListRes> getAuthorItemList(@PathVariable String address) {
        try {
            List<Items> list = itemService.getAuthorItemList(address);
            //Users user = userService.getUserByAddress(address);
            //String nickname = user.getNickname();
            return ResponseEntity.status(200).body(ItemAuthorListRes.of("Success", list));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(ItemAuthorListRes.of("존재하지 않는 token_id"));
        }
    }

}
