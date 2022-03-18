package com.daram.dotore.api.service;

import com.daram.dotore.api.request.ItemReq;
import com.daram.dotore.db.entity.Items;

public interface ItemService {
    Items saveNewItem(ItemReq itemReq) throws Exception;
}
