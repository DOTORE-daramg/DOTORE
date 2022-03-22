package com.daram.dotore.api.service;

import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Users;
import com.daram.dotore.db.repository.AnswerRepository;
import com.daram.dotore.db.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Override
    public List<Feedback> getResponseFeedbackList(String address) {
        return feedbackRepository.findByAddress(address);
    }

    @Override
    public Integer getCount(int articleNo){
        return answerRepository.getCount(articleNo);
    }

}
