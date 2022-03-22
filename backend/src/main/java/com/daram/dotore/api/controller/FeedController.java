package com.daram.dotore.api.controller;

import com.daram.dotore.api.response.FeedbackListRes;
import com.daram.dotore.api.response.ItemDetailRes;
import com.daram.dotore.api.response.ItemsRes;
import com.daram.dotore.api.service.FeedbackService;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Items;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "피드백 API")
@RestController
@RequestMapping("/api/feedbacks")
public class FeedController {

    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/{tokenId}")
    @ApiOperation(value = "피드백 목록 조회", notes = "해당 작품의 피드백 목록을 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = FeedbackListRes.class),
        @ApiResponse(code = 404, message = "아무 피드백도 존재하지 않음", response = FeedbackListRes.class),
    })
    public ResponseEntity<FeedbackListRes> getDetail(@PathVariable BigInteger tokenId) {
        FeedbackListRes res=feedbackService.getFeedbacks(tokenId);
        if(res==null){
            return ResponseEntity.status(404).body(FeedbackListRes.of("아무 피드백도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(res);

    }
}
