package com.daram.dotore.api.service;

import com.daram.dotore.api.request.AnswerReq;
import com.daram.dotore.api.request.FeedbackReq;
import com.daram.dotore.api.request.FeedbackUpdateReq;
import com.daram.dotore.api.response.FeedbackAnswerVO;
import com.daram.dotore.api.response.FeedbackDetailRes;
import com.daram.dotore.api.response.FeedbackListRes;
import com.daram.dotore.api.response.FeedbackVO;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Answer;
import com.daram.dotore.db.entity.Users;
import com.daram.dotore.db.repository.AnswerRepository;
import com.daram.dotore.db.repository.FeedbackRepository;
import com.daram.dotore.db.repository.UserRepository;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public FeedbackListRes getFeedbacks(BigInteger tokenId) {
        List<Feedback> feedbacks = feedbackRepository.findByTokenId(tokenId);
        List<FeedbackVO> list = new ArrayList<>();
        if (feedbacks.isEmpty()) {
            return null;
        }
        for (Feedback feedback : feedbacks) {
            boolean yn;
            String nickname;
            List<Answer> answer = answerRepository.findByArticleno(feedback.getArticleno());
            yn = (answer.isEmpty()) ? false : true;
            Optional<Users> user = userRepository.findByAddress(feedback.getAddress());
            nickname = user.get().getNickname();

            list.add(new FeedbackVO(feedback.getArticleno(), feedback.getAddress(),
                feedback.getDescription(), yn, nickname));
        }
        return FeedbackListRes.of("Success", list);
    }

    @Override
    public FeedbackListRes getMyFeedbacks(BigInteger tokenId, String address) {
        List<Feedback> feedbacks = feedbackRepository.findByTokenIdAndAddress(tokenId, address);
        List<FeedbackVO> list = new ArrayList<>();
        if (feedbacks.isEmpty()) {
            return null;
        }
        for (Feedback feedback : feedbacks) {
            boolean yn;
            String nickname;
            List<Answer> answer = answerRepository.findByArticleno(feedback.getArticleno());
            yn = (answer.isEmpty()) ? false : true;
            Optional<Users> user = userRepository.findByAddress(feedback.getAddress());
            nickname = user.get().getNickname();

            list.add(new FeedbackVO(feedback.getArticleno(), feedback.getAddress(),
                feedback.getDescription(), yn, nickname));
        }
        return FeedbackListRes.of("Success", list);
    }

    @Override
    public List<Feedback> getResponseFeedbackList(String address) {
        return feedbackRepository.findByAddress(address);
    }

    @Override
    public Integer getCount(int articleno) {

        return answerRepository.getCount(articleno);
    }

    @Override
    public FeedbackDetailRes getFeedbackDetail(int articleno) {
        Feedback feedback = feedbackRepository.findByArticleno(articleno);
        if (feedback == null) {
            return null;
        }
        Users user = userRepository.findByAddress(feedback.getAddress()).get();
        List<Answer> list = answerRepository.findByArticleno(articleno);
        List<FeedbackAnswerVO> answers = new ArrayList<>();
        for (Answer answer : list) {
            String profile_img_url = userRepository.findByAddress(answer.getWriter()).get()
                .getProfileImgUrl();
            answers.add(new FeedbackAnswerVO(answer.getAnswerno(), answer.getWriter(),
                answer.getDescription(), answer.getCreatedAt(), answer.getImgUrl(),
                profile_img_url));
        }
        return FeedbackDetailRes.of("Success", feedback, user.getProfileImgUrl(), answers);
    }

    @Override
    public List<Feedback> getRespondentList(String address) {
        return feedbackRepository.getRespondentList(address);
    }

    @Override
    public Feedback saveNewFeedback(FeedbackReq feedbackReq) {
        return feedbackRepository.save(Feedback.builder()
            .tokenId(feedbackReq.getTokenId())
            .address(feedbackReq.getQuestioner())
            .respondent(feedbackReq.getRespondent())
            .description(feedbackReq.getDescription())
            .createdAt(LocalDateTime.now())
            .imgUrl(feedbackReq.getImgUrl())
            .build());
    }

    @Override
    public Feedback updateFeedback(FeedbackUpdateReq feedbackUpdateReq) {
        Feedback feedback = feedbackRepository.findByArticleno(feedbackUpdateReq.getNo());
        if (feedback == null) {
            return null;
        }
        return feedbackRepository.save(feedback.updateFeedback(feedbackUpdateReq.getDescription(),
            feedbackUpdateReq.getImgUrl()));
    }

    @Override
    public Answer saveNewAnswer(AnswerReq answerReq) throws Exception {
        return answerRepository.save(Answer.builder()
            .articleno(answerReq.getArticleNo())
            .writer(answerReq.getWriter())
            .description(answerReq.getDescription())
            .createdAt(LocalDateTime.now())
            .imgUrl(answerReq.getImgUrl())
            .build());
    }

    @Override
    public Answer updateAnswer(FeedbackUpdateReq feedbackUpdateReq) {
        Answer answer = answerRepository.findByAnswerno(feedbackUpdateReq.getNo());
        if (answer == null) {
            return null;
        }
        return answerRepository.save(answer.updateAnswer(feedbackUpdateReq.getDescription(),
            feedbackUpdateReq.getImgUrl()));
    }
}
