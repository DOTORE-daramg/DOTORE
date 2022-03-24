package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.ApiModel;
import java.math.BigInteger;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemDetailResponse")
public class ItemDetailRes extends BaseRes {

    private BigInteger tokenId;
    private String itemHash;
    private String itemTitle;
    private String itemDescription;
    private LocalDateTime createdAt;
    private String authorAddress;
    private String ownerAddress;
    private Boolean onSaleYn;
    private Boolean isFirst;

    private String nickname;
    private int acorn;
    private String profileImgUrl;

    int download;
    int like;
    String format;
    String[] tags;

    String price;

    public static ItemDetailRes of(String result){
        ItemDetailRes res = new ItemDetailRes();
        res.setResult(result);
        return res;
    }

    public static ItemDetailRes of(String result, Items item, Users user, int download, int like, String[] tags) {
        ItemDetailRes res = new ItemDetailRes();
        res.setResult(result);
        if(item != null){
            res.setTokenId(item.getTokenId());
            res.setItemHash(item.getItem_hash());
            res.setItemTitle(item.getItem_title());
            res.setItemDescription(item.getItem_description());
            res.setCreatedAt(item.getCreated_at());
            res.setAuthorAddress(item.getAuthor_address());
            res.setOwnerAddress(item.getOwner_address());
            res.setOnSaleYn(item.getOnSaleYn());
            res.setIsFirst(item.getIsFirst());
            res.setFormat(item.getFormat());
        }
        if (user != null) {
            res.setNickname(user.getNickname());
            res.setAcorn(user.getAcorn());
            res.setProfileImgUrl(user.getProfile_img_url());
        }
        res.setDownload(download);
        res.setLike(like);
        res.setTags(tags);
        return res;
    }

    public static ItemDetailRes of(String result, Items item, Users user, int download, int like, String[] tags, String price) {
        ItemDetailRes res = new ItemDetailRes();
        res.setResult(result);
        if(item != null){
            res.setTokenId(item.getTokenId());
            res.setItemHash(item.getItem_hash());
            res.setItemTitle(item.getItem_title());
            res.setItemDescription(item.getItem_description());
            res.setCreatedAt(item.getCreated_at());
            res.setAuthorAddress(item.getAuthor_address());
            res.setOwnerAddress(item.getOwner_address());
            res.setOnSaleYn(item.getOnSaleYn());
            res.setFormat(item.getFormat());
        }
        if (user != null) {
            res.setNickname(user.getNickname());
            res.setAcorn(user.getAcorn());
            res.setProfileImgUrl(user.getProfile_img_url());
        }
        res.setDownload(download);
        res.setLike(like);
        res.setTags(tags);
        res.setPrice(price);
        return res;
    }
}
