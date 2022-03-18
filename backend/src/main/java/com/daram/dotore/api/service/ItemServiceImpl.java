package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.db.entity.Items;
import com.daram.dotore.db.entity.Secondary;
import com.daram.dotore.db.entity.Taglist;
import com.daram.dotore.db.repository.ItemRepository;
import com.daram.dotore.db.repository.SecondaryRepository;
import com.daram.dotore.db.repository.TagRepository;
import java.time.LocalDateTime;
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

    @Override
    public Items saveNewItem(ItemReq itemReq) throws Exception{
        Items item = itemRepository.save(Items.builder()
            .token_id(itemReq.getToken_id())
            .item_hash(itemReq.getItem_hash())
            .item_title(itemReq.getItem_title())
            .item_description(itemReq.getItem_description())
            .created_at(LocalDateTime.now())
            .author_address(itemReq.getAuthor_address())
            .owner_address(itemReq.getOwner_address())
            .on_sale_yn(false)
            .is_first(itemReq.is_first())
            .build());

        for (String tag : itemReq.getTags()) {
            tagRepository.save(Taglist.builder()
                .token_id(itemReq.getToken_id())
                .tag(tag)
                .build());
        }

        for (String ori : itemReq.getOriginal()) {
            secondaryRepository.save(Secondary.builder()
                .token_id(itemReq.getToken_id())
                .original(ori)
                .build());
        }

        return item;
    }
}
