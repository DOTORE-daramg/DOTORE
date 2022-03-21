package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.db.entity.Download;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Likes;
import com.daram.dotore.db.entity.Secondary;
import com.daram.dotore.db.entity.Taglist;
import com.daram.dotore.db.repository.DownloadRepository;
import com.daram.dotore.db.repository.ItemRepository;
import com.daram.dotore.db.repository.LikeRepository;
import com.daram.dotore.db.repository.SecondaryRepository;
import com.daram.dotore.db.repository.TagRepository;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    SecondaryRepository secondaryRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    DownloadRepository downloadRepository;

    @Override
    public Items saveNewItem(ItemReq itemReq) throws Exception {
        Items item = itemRepository.save(Items.builder()
            .tokenId(itemReq.getTokenId())
            .item_hash(itemReq.getItem_hash())
            .item_title(itemReq.getItem_title())
            .item_description(itemReq.getItem_description())
            .created_at(LocalDateTime.now())
            .author_address(itemReq.getAuthor_address())
            .owner_address(itemReq.getOwner_address())
            .on_sale_yn(false)
            .is_first(itemReq.getIs_first())
            .format(itemReq.getFormat())
            .build());

        for (String tag : itemReq.getTags()) {
            tagRepository.save(Taglist.builder()
                .tokenId(itemReq.getTokenId())
                .tag(tag)
                .build());
        }

        for (BigInteger ori : itemReq.getOriginal()) {
            secondaryRepository.save(Secondary.builder()
                .tokenId(itemReq.getTokenId())
                .original(ori)
                .build());
        }

        return item;
    }

    @Override
    public Items getItemByTokenId(BigInteger tokenId) {
        Optional<Items> opt = itemRepository.findByTokenId(tokenId);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public Items updateOwner(ItemUpdateReq itemReq) {
        Items item = getItemByTokenId(itemReq.getTokenId());
        return itemRepository.save(item.setOwner(itemReq.getOwner_address()));
    }

    @Override
    public Likes saveNewLike(String address, BigInteger tokenId) {
        Likes like = likeRepository.save(Likes.builder()
            .address(address)
            .tokenId(tokenId)
            .build());
        return like;
    }

    @Override
    public void deleteLike(Likes like, String address, BigInteger tokenId) {
        likeRepository.delete(like);
    }

    @Override
    public Likes getLike(String address, BigInteger tokenId) {
        Optional<Likes> opt = likeRepository.findByAddressAndTokenId(address, tokenId);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public Download saveNewDownload(String address, BigInteger tokenId) {
        return null;
    }

    @Override
    public Download getDownload(String address, BigInteger tokenId) {
        Optional<Download> opt = downloadRepository.findByAddressAndTokenId(address, tokenId);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public int countLike(BigInteger tokenId) {

        return likeRepository.countByTokenId(tokenId);
    }

    @Override
    public int countDownload(BigInteger tokenId) {
        return downloadRepository.countByTokenId(tokenId);
    }

    @Override
    public String[] getTags(BigInteger tokenId) {
        List<Taglist> list = tagRepository.findByTokenId(tokenId);
        String[] tags = new String[list.size()];
        for (int i = 0; i < list.size(); i++) {
            tags[i] = list.get(i).getTag();
        }
        return tags;
    }

    @Override
    public List<Items> getSecond(BigInteger original) { // 해당 1차에서 파생된 2차 창작물들 조회
        return itemRepository.getSecond(original);
    }

    @Override
    public List<Items> getFirst(BigInteger original) {  // 해당 2차의 원작인 1차 창작물들 조회
        return itemRepository.getFirst(original);
    }
}
