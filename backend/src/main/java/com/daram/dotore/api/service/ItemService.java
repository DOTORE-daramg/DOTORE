package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemTrxReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.api.request.SaleCompleteReq;
import com.daram.dotore.api.response.ItemsRes;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Likes;

import java.math.BigInteger;
import java.util.List;

public interface ItemService {

    Items saveNewItem(ItemReq itemReq) throws Exception;

    Items getItemByTokenId(BigInteger token_id);

    Items getItemByTrxHash(String itemTrxHash);

    Items updateTokenId(ItemTrxReq itemTrxReq);

    Items updateOwner(ItemUpdateReq itemReq);

    Likes saveNewLike(String address, BigInteger tokenId);

    void deleteLike(Likes like, String address, BigInteger tokenId);

    Likes getLike(String address, BigInteger tokenId);

    Download saveNewDownload(String address, BigInteger tokenId);

    Download getDownload(String address, BigInteger tokenId);

    int countLike(BigInteger tokenId);

    boolean checkLike(String address, BigInteger tokenId);

    int countDownload(BigInteger tokenId);

    String[] getTags(BigInteger tokenId);

    List<Items> getSecond(BigInteger original);

    List<Items> getFirst(BigInteger original);

    List<Items> getItemList(String address);

    List<Items> getPendingItemList(String address);

    List<Items> getAuthorItemList(String address);

    ItemsRes getAll();

    ItemsRes getFirst();

    ItemsRes getSecond();

    ItemsRes getSale();

    Items updateOnSaleYn(BigInteger tokenId);

    Items updateOnSaleYnAndOwnerAddress(SaleCompleteReq saleCompleteReq);

    Items updateCancelOnSaleYn(BigInteger tokenId);

    Items updateImageUrl(BigInteger tokenId, String imageUrl);
}
