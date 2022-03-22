package com.daram.dotore.api.service;

import com.daram.dotore.api.response.FeedbackListRes;
import java.math.BigInteger;
import java.util.List;

public interface FeedbackService {

    FeedbackListRes getFeedbacks(BigInteger tokenId);
}
