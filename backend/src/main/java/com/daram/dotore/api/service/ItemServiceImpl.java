package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemPageReq;
import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemTrxReq;
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
import javax.transaction.Transactional;
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

    @Transactional
    @Override
    public Items saveNewItem(ItemReq itemReq) throws Exception {
        Items item = itemRepository.save(Items.builder()
            .itemTrxHash(itemReq.getItemTrxHash())
            .tokenId(itemReq.getTokenId())
            .itemHash(itemReq.getItemHash())
            .itemTitle(itemReq.getItemTitle())
            .itemDescription(itemReq.getItemDescription())
            .createdAt(LocalDateTime.now())
            .authorAddress(itemReq.getAuthorAddress())
            .ownerAddress(itemReq.getAuthorAddress())
            .onSaleYn(false)
            .isFirst(itemReq.getIsFirst())
            .format(itemReq.getFormat())
            .status("Pending")
            .build());

        if (itemReq.getTags() != null) {
            for (String tag : itemReq.getTags()) {
                tagRepository.save(Taglist.builder()
                    .tag(tag)
                    .itemTrxHash(itemReq.getItemTrxHash())
                    .build());
            }
        }

        if (itemReq.getOriginal() != null) {
            for (BigInteger ori : itemReq.getOriginal()) {
                secondaryRepository.save(Secondary.builder()
                    .original(ori)
                    .itemTrxHash(itemReq.getItemTrxHash())
                    .build());
            }
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
    public Items getItemByTrxHash(String itemTrxHash) {
        Optional<Items> opt = itemRepository.findByItemTrxHash(itemTrxHash);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Transactional
    @Override
    public Items updateMint(ItemTrxReq itemTrxReq) {
        Items item = getItemByTrxHash(itemTrxReq.getItemTrxHash());
        tagRepository.updateTokenId(itemTrxReq.getItemTrxHash(), itemTrxReq.getTokenId());
        secondaryRepository.updateTokenId(itemTrxReq.getItemTrxHash(), itemTrxReq.getTokenId());

        item.setTokenId(itemTrxReq.getTokenId());
        if (itemTrxReq.getTokenId().intValue() == 0) {
            item.setStatus("Fail");
        } else {
            item.setStatus("Success");
            userService.plusAcorn(item.getAuthorAddress(), 10);
        }

        return itemRepository.save(item);
    }

    @Override
    public Items updateOwner(ItemUpdateReq itemReq) {
        Items item = getItemByTokenId(itemReq.getTokenId());
        return itemRepository.save(item.setOwner(itemReq.getOwnerAddress()));
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
    public boolean checkLike(String address, BigInteger tokenId) {
        Optional<Likes> opt = likeRepository.findByAddressAndTokenId(address, tokenId);
        if (opt.isPresent()) {
            return true;
        }
        return false;
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
    public List<Items> getPendingItemList(String address) {
        return itemRepository.getPendingItemList(address);
    }

    @Override
    public List<Items> getAuthorItemList(String address) {
        return itemRepository.getAuthorItemList(address);
    }

    @Override
    public ItemsRes getItemsByPage(ItemPageReq itemPageReq) {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items;
        int total = 0;
        int pageNum = (itemPageReq.getPageNum() - 1) * 12;

        if (itemPageReq.getSearch() == null) {
            return null;
        }
        String search = itemPageReq.getSearch();

        if (itemPageReq.getSort() == 0) {   // 최신순
            if ("all".equals(itemPageReq.getType())) {
                items = itemRepository.getRecentItemList(search, pageNum);
                total = itemRepository.findByStatusOrderByTokenIdDesc("Success").size();
            } else if ("first".equals(itemPageReq.getType())) {
                items = itemRepository.getRecentItemListByIsFirst(search, true, pageNum);
                total = itemRepository.findByIsFirstAndStatusOrderByTokenIdDesc(true, "Success")
                    .size();
            } else if ("second".equals(itemPageReq.getType())) {
                items = itemRepository.getRecentItemListByIsFirst(search, false, pageNum);
                total = itemRepository.findByIsFirstAndStatusOrderByTokenIdDesc(false, "Success")
                    .size();
            } else {
                return null;
            }
        } else if (itemPageReq.getSort() == 1) {  // 인기순
            if ("all".equals(itemPageReq.getType())) {
                items = itemRepository.getFavoriteItemList(pageNum);
                total = itemRepository.findByStatusOrderByTokenIdDesc("Success").size();
            } else if ("first".equals(itemPageReq.getType())) {
                items = itemRepository.getFavoriteItemListByIsFirst(true, pageNum);
                total = itemRepository.findByIsFirstAndStatusOrderByTokenIdDesc(true, "Success")
                    .size();
            } else if ("second".equals(itemPageReq.getType())) {
                items = itemRepository.getFavoriteItemListByIsFirst(false, pageNum);
                total = itemRepository.findByIsFirstAndStatusOrderByTokenIdDesc(false, "Success")
                    .size();
            } else {
                return null;
            }
        } else {
            return null;
        }
        if (items == null) {
            return null;
        }

        Users user;
        int download = 0;
        int like = 0;
        String[] tags;
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwnerAddress());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags));
        }

        return ItemsRes.of("작품 조회 성공", total, list);
    }

    @Override
    public ItemsRes getFirst() {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items = itemRepository.findByIsFirstAndStatusOrderByTokenIdDesc(true,
            "Success");
        if (items.isEmpty()) {
            return null;
        }
        Users user;
        int download;
        int like;
        String[] tags;
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwnerAddress());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags));
        }
        return ItemsRes.of("1차 창작물 조회 성공", list);
    }

    @Override
    public ItemsRes getSale() {
        List<ItemDetailRes> list = new ArrayList<>();
        List<Items> items = itemRepository.findByOnSaleYnOrderByTokenIdDesc(true);

        if (items.isEmpty()) {
            return null;
        }
        Users user;
        int download;
        int like;
        String[] tags;
        String price;
        for (Items item : items) {
            user = userService.getUserByAddress(item.getOwnerAddress());
            download = downloadRepository.countByTokenId(item.getTokenId());
            like = likeRepository.countByTokenId(item.getTokenId());
            tags = getTags(item.getTokenId());
            price = saleRepository.findByTokenIdAndSaleYn(item.getTokenId(), false).get()
                .getPrice();
            list.add(ItemDetailRes.of("Item", item, user, download, like, tags, price));
        }
        return ItemsRes.of("판매중인 작품 조회 성공", list);
    }

    @Override
    public Items updateOnSaleYn(BigInteger tokenId) {
        Optional<Items> item = itemRepository.findByTokenId(tokenId);
        if (!item.isPresent()) {
            return null;
        }
        item.get().setOnSaleYn(true);
        return itemRepository.save(item.get());
    }

    @Override
    public Items updateOnSaleYnAndOwnerAddress(SaleCompleteReq saleCompleteReq) {
        BigInteger tokenId = saleCompleteReq.getTokenId();
        Optional<Items> item = itemRepository.findByTokenId(tokenId);
        if (!item.isPresent()) {
            return null;
        }
        item.get().setOnSaleYn(false);
        item.get().setOwner(saleCompleteReq.getBuyerAddress());
        return itemRepository.save(item.get());
    }

    @Override
    public Items updateCancelOnSaleYn(BigInteger tokenId) {
        Optional<Items> item = itemRepository.findByTokenId(tokenId);
        if (!item.isPresent()) {
            return null;
        }
        item.get().setOnSaleYn(false);
        return itemRepository.save(item.get());
    }

    @Override
    public void deleteItem(String itemTrxHash) {
        Optional<Items> item = itemRepository.findByItemTrxHash(itemTrxHash);
        if (!item.isPresent()) {
            return;
        }
        List<Taglist> tags = tagRepository.findByItemTrxHash(itemTrxHash);
        for (Taglist tag : tags) {
            tagRepository.delete(tag);
        }
        List<Secondary> secondaryList = secondaryRepository.findByItemTrxHash(itemTrxHash);
        for (Secondary secondary : secondaryList) {
            secondaryRepository.delete(secondary);
        }
        itemRepository.delete(item.get());
    }
}
