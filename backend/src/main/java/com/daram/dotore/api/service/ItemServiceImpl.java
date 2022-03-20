package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.api.request.ItemUpdateReq;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Secondary;
import com.daram.dotore.db.entity.Taglist;
import com.daram.dotore.db.repository.DownloadRepository;
import com.daram.dotore.db.repository.FormatRepository;
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
    DownloadRepository downloadRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    FormatRepository formatRepository;

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
            .build());

        for (String tag : itemReq.getTags()) {
            tagRepository.save(Taglist.builder()
                .tokenId(itemReq.getTokenId())
                .tag(tag)
                .build());
        }

        for (String ori : itemReq.getOriginal()) {
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
    public int countDownload(BigInteger tokenId) {
        return downloadRepository.countByTokenId(tokenId);
    }

    @Override
    public int countLike(BigInteger tokenId) {
        return likeRepository.countByTokenId(tokenId);
    }

    @Override
    public String getFormat(BigInteger tokenId) {
        return formatRepository.findById(tokenId).get().getFormat();
    }

    @Override
    public String[] getTags(BigInteger tokenId) {
        List<Taglist> list=tagRepository.findByTokenId(tokenId);
        String[] tags=new String[list.size()];
        for (int i=0; i<list.size();i++){
            tags[i]=list.get(i).getTag();
        }
        return tags;
    }
}
