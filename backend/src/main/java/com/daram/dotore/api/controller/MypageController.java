package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.DescUpdateReq;
import com.daram.dotore.api.request.NicknameUpdateReq;
import com.daram.dotore.api.request.ProfileUpdateReq;
import com.daram.dotore.api.response.*;
import com.daram.dotore.api.service.AwsS3Service;
import com.daram.dotore.api.service.FeedbackService;
import com.daram.dotore.api.service.ItemService;
import com.daram.dotore.api.service.UserService;
import com.daram.dotore.db.entity.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@Api(value = "마이페이지 API")
@RestController
@RequestMapping("/api/mypage")
public class MypageController {

    @Autowired
    UserService userService;

    @Autowired
    ItemService itemService;

    @Autowired
    FeedbackService feedbackService;

    @Autowired
    AwsS3Service awsS3Service;

    @GetMapping("/{address}")
    @ApiOperation(value = "마이페이지", notes = "마이페이지에서 회원 정보 가져오기")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = UserRes.class),
        @ApiResponse(code = 404, message = "존재하지 않는 address", response = UserRes.class),
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

    @GetMapping("/owner/{address}")
    @ApiOperation(value = "특정 주소가 보유한 작품 목록 조회", notes = "특정 주소가 보유한 작품 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = ItemListRes.class),
    })
    public ResponseEntity<ItemListRes> getItemList(@PathVariable String address) {
        try {
            List<Items> list = itemService.getItemList(address);
            if(list.size()==0){
                return ResponseEntity.status(201).body(ItemListRes.of("작품 목록이 없습니다.", list));
            }
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

    @PostMapping("/response/{address}")
    @ApiOperation(value = "받은 피드백 목록 조회", notes = "받은 피드백 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = ItemButtonRes.class),
    })
    public ResponseEntity<responseFeedbackRes> responseFeedbackList(@PathVariable String address) {
        try {
            //address가 요청 받은 피드백 목록 받아오기
            List<Feedback> list = feedbackService.getRespondentList(address);
            List<Items> list2 = itemService.getItemList(address);
            //answer테이블에 articleno가 있는 로우가 있는지 판별해서 넘겨주기(있으면 T,없으면 F)
            //boolean YN = userService.get 카운트 조회해서 0이면 F 1이상이면 T
            
            //address랑 respondent비교해서 출력
            
            List<Boolean> booleanList = new ArrayList<>();
            for (int i = 0; i < list.size(); i++) {
                int articleNo = list.get(i).getArticleno();
                int temp = feedbackService.getCount(articleNo);
                if(temp == 0){//articleno가 0이면 해당 글에 대한 답변이 없는 상황
                    booleanList.add(Boolean.FALSE);
                }else{//articleno가 0이 아니라면 해당 글에 대한 답변이 하나라도 있는 상황
                    booleanList.add(Boolean.TRUE);
                }
            }
            return ResponseEntity.status(200).body(responseFeedbackRes.of("Success", list,list2,booleanList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(responseFeedbackRes.of("존재하지 않는 token_id"));
        }
    }

    @PostMapping("/request/{address}")
    @ApiOperation(value = "요청한 피드백 목록 조회", notes = "요청한 피드백 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = requestFeedbackRes.class),
    })
    public ResponseEntity<requestFeedbackRes> requestFeedbackList(@PathVariable String address) {
        try {
            //address를 통해서 feedback테이블의 로우 받아오기
            List<Feedback> list = feedbackService.getResponseFeedbackList(address);
            //list의 tokenId를 바탕으로 item_title구하기 > list2에 저장
            List<Items> list2 = new ArrayList<>();
            for (int i = 0; i < list.size(); i++) {
                BigInteger tokenId = list.get(i).getTokenId();
                Items item = itemService.getItemByTokenId(tokenId);
                list2.add(item);
            }

            List<Boolean> booleanList = new ArrayList<>();
            for (int i = 0; i < list.size(); i++) {
                int articleNo = list.get(i).getArticleno();
                int temp = feedbackService.getCount(articleNo);
                if(temp == 0){//articleno가 0이면 해당 글에 대한 답변이 없는 상황
                    booleanList.add(Boolean.FALSE);
                }else{//articleno가 0이 아니라면 해당 글에 대한 답변이 하나라도 있는 상황
                    booleanList.add(Boolean.TRUE);
                }
            }
            return ResponseEntity.status(200).body(requestFeedbackRes.of("Success", list,list2,booleanList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(requestFeedbackRes.of("존재하지 않는 token_id"));
        }
    }

    @GetMapping("/download/{address}")
    @ApiOperation(value = "내가 다운로드한 작품 목록", notes = "내가 다운로드한 작품 목록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = MyDownloadListRes.class),
    })
    public ResponseEntity<MyDownloadListRes> myDownloadList(@PathVariable String address) {
        try {
            List<Download> downloadList = userService.getDownloadList(address);
            List<Items> list = new ArrayList<>();
            for (int i = 0; i < downloadList.size(); i++) {
                BigInteger tokenId = downloadList.get(i).getTokenId();
                Items item = itemService.getItemByTokenId(tokenId);
                list.add(item);
            }
            return ResponseEntity.status(200).body(MyDownloadListRes.of("Success",list));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(MyDownloadListRes.of("존재하지 않는 token_id"));
        }
    }

    @GetMapping("/like/{address}")
    @ApiOperation(value = "내가 좋아요한 작품 목록", notes = "내가 좋아요한 작품 목록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = MyLikeListRes.class),
    })
    public ResponseEntity<MyLikeListRes> myLikeList(@PathVariable String address) {
        try {
            List<Likes> likeList = userService.getLikeList(address);
            List<Items> list = new ArrayList<>();
            for (int i = 0; i < likeList.size(); i++) {
                BigInteger tokenId = likeList.get(i).getTokenId();
                Items item = itemService.getItemByTokenId(tokenId);
                list.add(item);
            }
            return ResponseEntity.status(200).body(MyLikeListRes.of("Success",list));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(MyLikeListRes.of("존재하지 않는 token_id"));
        }
    }

    @PatchMapping("/img")
    @ApiOperation(value = "프로필 이미지 변경", notes = "마이페이지에서 프로필 이미지 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
            @ApiResponse(code = 404, message = "존재하지 않는 프로필 이미지 주소", response = BaseRes.class),
    })
    @JsonProperty("address")
    public ResponseEntity<BaseRes> upload(@ModelAttribute ProfileUpdateReq profileUpdateReq,@RequestPart("data") MultipartFile file ) throws IOException {
        //이미 사용자의 프로필 이미지가 등록이 되어있는지 확인
        String oldImageUrl = userService.getUserByAddress(profileUpdateReq.getAddress()).getProfile_img_url();
        //프로필 이미지 업로드 및 주소 반환
        String imageUrl = awsS3Service.uploadFiles(file, "profile",profileUpdateReq);
        //사용자 정보 불러오기
        Users user = userService.getUserByAddress(profileUpdateReq.getAddress());
        if(user==null){
            return ResponseEntity.status(404).body(BaseRes.of("존재하지 않는 사용자"));
        }
        //사용자 정보와 새로운 프로필 이미지 주소로 새로운 사용자 정보 생성
        ProfileUpdateReq newProfile = new ProfileUpdateReq(profileUpdateReq.getAddress(),imageUrl);
        //새로운 사용자로 프로필 업데이트
        userService.updateProfile(newProfile);
        //기존 프로필 이미지 삭제
        awsS3Service.delete(oldImageUrl);
        return ResponseEntity.status(200).body(BaseRes.of("프로필 이미지 업로드 및 수정 완료"));
    }
}
