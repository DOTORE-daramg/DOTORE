package com.daram.dotore.api.service;

import com.daram.dotore.api.response.FeedbackListRes;
import com.daram.dotore.api.response.FeedbackVO;
import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Answer;
import com.daram.dotore.db.entity.Users;
import com.daram.dotore.db.repository.AnswerRepository;
import com.daram.dotore.db.repository.FeedbackRepository;
import com.daram.dotore.db.repository.UserRepository;
import java.math.BigInteger;
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
    public List<Feedback> getResponseFeedbackList(String address) {
        return feedbackRepository.findByAddress(address);
    }

    @Override
    public Integer getCount(int articleNo) {
        return answerRepository.getCount(articleNo);
    }

    @Override
    public Integer getRequestCount(String address) {
        return answerRepository.getRequestCount(address);
    }

    @Override
    public List<Feedback> getRespondentList(String address) {
        return feedbackRepository.getRespondentList(address);
    }
}
