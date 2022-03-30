package com.daram.dotore.api.controller;

import com.daram.dotore.api.request.AnswerReq;
import com.daram.dotore.api.request.FeedbackMeReq;
import com.daram.dotore.api.request.FeedbackReq;
import com.daram.dotore.api.request.FeedbackUpdateReq;
import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.FeedbackDetailRes;
import com.daram.dotore.api.response.FeedbackListRes;
import com.daram.dotore.api.response.FeedbackRes;
import com.daram.dotore.api.service.AwsS3Service;
import com.daram.dotore.api.service.FeedbackService;
import com.daram.dotore.db.entity.Answer;
import com.daram.dotore.db.entity.Feedback;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.math.BigInteger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@Api(value = "피드백 API")
@RestController
@RequestMapping("/api/feedbacks")
public class FeedBackController {

    @Autowired
    FeedbackService feedbackService;

    @Autowired
    AwsS3Service awsS3Service;

    @GetMapping("/{tokenId}")
    @ApiOperation(value = "피드백 목록 조회", notes = "해당 작품의 피드백 목록을 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = FeedbackListRes.class),
        @ApiResponse(code = 404, message = "아무 피드백도 존재하지 않음", response = FeedbackListRes.class),
    })
    public ResponseEntity<FeedbackListRes> getFeedbackList(@PathVariable BigInteger tokenId) {
        FeedbackListRes res = feedbackService.getFeedbacks(tokenId);
        if (res == null) {
            return ResponseEntity.status(404).body(FeedbackListRes.of("아무 피드백도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("/me")
    @ApiOperation(value = "내가 요청한 피드백 목록 조회", notes = "해당 작품의 내 요청 피드백 목록을 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = FeedbackListRes.class),
        @ApiResponse(code = 404, message = "아무 피드백도 존재하지 않음", response = FeedbackListRes.class),
    })
    public ResponseEntity<FeedbackListRes> getFeedbackList(@RequestBody FeedbackMeReq feedbackMeReq) {
        FeedbackListRes res = feedbackService.getMyFeedbacks(feedbackMeReq.getTokenId(),feedbackMeReq.getAddress());
        if (res == null) {
            return ResponseEntity.status(404).body(FeedbackListRes.of("아무 피드백도 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/detail/{articleno}")
    @ApiOperation(value = "피드백 상세페이지 조회", notes = "해당 피드백의 질문 답변을 모두 반환")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = FeedbackDetailRes.class),
        @ApiResponse(code = 404, message = "해당 피드백이 존재하지 않음", response = FeedbackDetailRes.class),
    })
    public ResponseEntity<FeedbackDetailRes> getDetail(@PathVariable int articleno) {

        FeedbackDetailRes res = feedbackService.getFeedbackDetail(articleno);
        if (res == null) {
            return ResponseEntity.status(404).body(FeedbackDetailRes.of("해당 피드백이 존재하지 않음"));
        }
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping
    @ApiOperation(value = "피드백 질문", notes = "해당 작품에 새로운 질문을 등록")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = FeedbackRes.class),
        @ApiResponse(code = 400, message = "Fail", response = FeedbackRes.class),
    })
    public ResponseEntity<FeedbackRes> makeNewFeedback(@RequestBody FeedbackReq feedbackReq)
        throws Exception {
        try {
            Feedback feedback = feedbackService.saveNewFeedback(feedbackReq);
            return ResponseEntity.status(200)
                .body(FeedbackRes.of("Success", feedback.getArticleno()));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(FeedbackRes.of("Fail"));
        }
    }

    @PostMapping("/answer")
    @ApiOperation(value = "피드백 내용 작성(답변)", notes = "피드백 상세페이지에서 글을 작성")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> writeAnswer(@RequestBody AnswerReq answerReq) throws Exception{
        try {
            feedbackService.saveNewAnswer(answerReq);
            return ResponseEntity.status(200)
                .body(BaseRes.of("Success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseRes.of("Fail"));
        }
    }

    @PatchMapping("/modify/feedback")
    @ApiOperation(value = "피드백 질문 수정", notes = "피드백 상세페이지에서 피드백(가장 위에 있는 첫 질문) 내용 수정")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> modifyFeedback(@RequestBody FeedbackUpdateReq feedbackUpdateReq){
        Feedback feedback=feedbackService.updateFeedback(feedbackUpdateReq);
        if(feedback==null){
            return ResponseEntity.status(400)
                .body(BaseRes.of("Fail"));
        }
        return ResponseEntity.status(200)
            .body(BaseRes.of("Success"));
    }

    @PatchMapping("/modify/answer")
    @ApiOperation(value = "피드백 답변 수정", notes = "피드백 상세페이지에서 답변 내용 수정")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 400, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> modifyAnswer(@RequestBody FeedbackUpdateReq feedbackUpdateReq){
        Answer answer=feedbackService.updateAnswer(feedbackUpdateReq);
        if(answer==null){
            return ResponseEntity.status(400)
                .body(BaseRes.of("Fail"));
        }
        return ResponseEntity.status(200)
            .body(BaseRes.of("Success"));
    }
}
