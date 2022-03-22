package com.daram.dotore.api.service;

import com.daram.dotore.db.entity.Feedback;

import java.util.List;

public interface FeedbackService {
    List<Feedback> getResponseFeedbackList(String address);

    Integer getCount(int articleNo);

    Integer getRequestCount(String address);

    List<Feedback> getRespondentList(String address);
}
