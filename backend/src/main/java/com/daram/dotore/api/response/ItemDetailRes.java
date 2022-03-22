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
    private String item_hash;
    private String item_title;
    private String item_description;
    private LocalDateTime created_at;
    private String author_address;
    private String owner_address;
    private Boolean on_sale_yn;

    private String nickname;
    private int acorn;
    private String profile_img_url;

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
            res.setItem_hash(item.getItem_hash());
            res.setItem_title(item.getItem_title());
            res.setItem_description(item.getItem_description());
            res.setCreated_at(item.getCreated_at());
            res.setAuthor_address(item.getAuthor_address());
            res.setOwner_address(item.getOwner_address());
            res.setOn_sale_yn(item.getOnSaleYn());
            res.setFormat(item.getFormat());
        }
        if (user != null) {
            res.setNickname(user.getNickname());
            res.setAcorn(user.getAcorn());
            res.setProfile_img_url(user.getProfile_img_url());
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
            res.setItem_hash(item.getItem_hash());
            res.setItem_title(item.getItem_title());
            res.setItem_description(item.getItem_description());
            res.setCreated_at(item.getCreated_at());
            res.setAuthor_address(item.getAuthor_address());
            res.setOwner_address(item.getOwner_address());
            res.setOn_sale_yn(item.getOnSaleYn());
            res.setFormat(item.getFormat());
        }
        if (user != null) {
            res.setNickname(user.getNickname());
            res.setAcorn(user.getAcorn());
            res.setProfile_img_url(user.getProfile_img_url());
        }
        res.setDownload(download);
        res.setLike(like);
        res.setTags(tags);
        res.setPrice(price);
        return res;
    }
}
