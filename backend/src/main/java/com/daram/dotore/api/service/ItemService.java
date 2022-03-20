package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.db.entity.Items;
import java.math.BigInteger;
import java.util.List;

public interface ItemService {

    Items saveNewItem(ItemReq itemReq) throws Exception;

    Items getItemByTokenId(BigInteger token_id);

    Items updateOwner(ItemUpdateReq itemReq);

    int countDownload(BigInteger tokenId);

    int countLike(BigInteger tokenId);

    String[] getTags(BigInteger tokenId);

    List<Items> getSecond(BigInteger original);

    List<Items> getFirst(BigInteger original);
}
