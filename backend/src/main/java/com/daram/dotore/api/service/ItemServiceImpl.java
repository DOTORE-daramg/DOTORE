package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.api.request.SaleCompleteReq;
import com.daram.dotore.api.response.ItemDetailRes;
import com.daram.dotore.api.response.ItemsRes;
import com.daram.dotore.db.entity.*;
import com.daram.dotore.db.repository.DownloadRepository;
import com.daram.dotore.db.repository.ItemRepository;
import com.daram.dotore.db.repository.LikeRepository;
import com.daram.dotore.db.repository.SaleRepository;
import com.daram.dotore.db.repository.SecondaryRepository;
import com.daram.dotore.db.repository.TagRepository;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    UserService userService;

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
        Download download = downloadRepository.save(Download.builder()
            .address(address)
            .tokenId(tokenId)
            .build());
        return download;
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

    // 해당 1차에서 파생된 2차 창작물들 조회
    @Override
    public List<Items> getSecond(BigInteger original) {

        return itemRepository.getSecond(original);
    }

    // 해당 2차의 원작인 1차 창작물들 조회
    @Override
    public List<Items> getFirst(BigInteger original) {

        return itemRepository.getFirst(original);
    }

    @Override
    public List<Items> getItemList(String address) {

        return itemRepository.getItemList(address);
    }

    @Override
    public List<Items> getAuthorItemList(String address) {
        return itemRepository.getAuthorItemList(address);
    }

    @Override
    public ItemsRes getAll() {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items = itemRepository.findAll();
        if (items == null) {
            return null;
        }
        Users user;
        int download = 0;
        int like = 0;
        String[] tags = new String[items.size()];
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwner_address());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags));
        }
        return ItemsRes.of("작품 전체 조회 성공", list);
    }

    @Override
    public ItemsRes getFirst() {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items = itemRepository.findByIsFirst(true);
        if (items.isEmpty()) {
            return null;
        }
        Users user;
        int download;
        int like;
        String[] tags;
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwner_address());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags));
        }
        return ItemsRes.of("1차 창작물 조회 성공", list);
    }

    @Override
    public ItemsRes getSecond() {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items = itemRepository.findByIsFirst(false);
        if (items.isEmpty()) {
            return null;
        }
        Users user;
        int download;
        int like;
        String[] tags;
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwner_address());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags));
        }
        return ItemsRes.of("2차 창작물 조회 성공", list);
    }

    @Override
    public ItemsRes getSale() {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items = itemRepository.findByOnSaleYn(true);

        if (items.isEmpty()) {
            return null;
        }
        Users user;
        int download;
        int like;
        String[] tags;
        String price;
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwner_address());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            price=saleRepository.findByTokenIdAndSaleYn(item.getTokenId(),false).get().getPrice();
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags, price));
        }
        return ItemsRes.of("판매중인 작품 조회 성공", list);
    }

    @Override
    public Items updateOnSaleYn(BigInteger tokenId) {
        Optional<Items> item = itemRepository.findByTokenId(tokenId);
        if(!item.isPresent()){
            return null;
        }
        item.get().setOnSaleYn(true);
        return itemRepository.save(item.get());
    }

    @Override
    public Items updateOnSaleYnAndOwnerAddress(SaleCompleteReq saleCompleteReq) {
        BigInteger tokenId = saleCompleteReq.getTokenId();
        Optional<Items> item = itemRepository.findByTokenId(tokenId);
        if(!item.isPresent()){
            return null;
        }
        item.get().setOnSaleYn(false);
        item.get().setOwner(saleCompleteReq.getBuyerAddress());
        return itemRepository.save(item.get());
    }

    @Override
    public Items updateCancelOnSaleYn(BigInteger tokenId) {
        Optional<Items> item = itemRepository.findByTokenId(tokenId);
        if(!item.isPresent()){
            return null;
        }
        item.get().setOnSaleYn(false);
        return itemRepository.save(item.get());
    }
}
