package com.daram.dotore.api.service;

import com.daram.dotore.api.response.FeedbackListRes;
import com.daram.dotore.db.entity.Feedback;
import java.math.BigInteger;


import java.util.List;

public interface FeedbackService {

    List<Feedback> getResponseFeedbackList(String address);

    Integer getCount(int articleNo);

    Integer getRequestCount(String address);

    FeedbackListRes getFeedbacks(BigInteger tokenId);

    List<Feedback> getRespondentList(String address);
}
