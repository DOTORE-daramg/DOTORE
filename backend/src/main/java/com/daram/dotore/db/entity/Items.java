package com.daram.dotore.db.entity;

import java.math.BigInteger;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "items")
public class Items {

    @Id
    @Column(name = "item_trx_hash", nullable = false, unique = true)
    String itemTrxHash;

    @Column(name = "token_id")
    BigInteger tokenId;

    @NotNull
    String item_hash;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,100}")
    String item_title;

    @NotNull
    String item_description;

    @NotNull
    LocalDateTime created_at;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String author_address;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String owner_address;

    @NotNull
    Boolean onSaleYn;

    @NotNull
    @Column(name = "is_first")
    Boolean isFirst;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,10}")
    String format;

    @NotNull
    String status;

    @Builder
    public Items(String itemTrxHash, BigInteger tokenId, String item_hash, String item_title,
        String item_description, LocalDateTime created_at, String author_address,
        String owner_address, boolean on_sale_yn, boolean is_first, String format, String status) {
        this.itemTrxHash = itemTrxHash;
        this.tokenId = tokenId;
        this.item_hash = item_hash;
        this.item_title = item_title;
        this.item_description = item_description;
        this.created_at = created_at;
        this.author_address = author_address;
        this.owner_address = owner_address;
        this.onSaleYn = on_sale_yn;
        this.isFirst = is_first;
        this.format = format;
        this.status = status;
    }

    public Items setOwner(String owner_address) {
        this.owner_address = owner_address;
        return this;
    }

    public Items setOnSaleYn(boolean onSaleYn) {
        this.onSaleYn = onSaleYn;
        return this;
    }

    public void setItem_hash(String item_hash) {
        this.item_hash = item_hash;
    }
}
