package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Likes;
import java.math.BigInteger;
import java.util.List;

public interface ItemService {

    Items saveNewItem(ItemReq itemReq) throws Exception;

    Items getItemByTokenId(BigInteger token_id);

    Items updateOwner(ItemUpdateReq itemReq);

    Likes saveNewLike(String address, BigInteger tokenId);

    Likes getLike(String address, BigInteger tokenId);

    Download saveNewDownload(String address, BigInteger tokenId);

    Download getDownload(String address, BigInteger tokenId);

    int countLike(BigInteger tokenId);

    int countDownload(BigInteger tokenId);

    String[] getTags(BigInteger tokenId);

    List<Items> getSecond(BigInteger original);

    List<Items> getFirst(BigInteger original);
}
