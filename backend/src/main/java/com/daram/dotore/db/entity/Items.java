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
    @Column(name = "token_id", nullable = false, unique = true)
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
    Boolean on_sale_yn;

    @NotNull
    Boolean is_first;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,10}")
    String format;

    @Builder
    public Items(BigInteger tokenId, String item_hash, String item_title,
        String item_description, LocalDateTime created_at, String author_address,
        String owner_address, boolean on_sale_yn, boolean is_first, String format) {
        this.tokenId = tokenId;
        this.item_hash = item_hash;
        this.item_title = item_title;
        this.item_description = item_description;
        this.created_at = created_at;
        this.author_address = author_address;
        this.owner_address = owner_address;
        this.on_sale_yn = on_sale_yn;
        this.is_first = is_first;
        this.format=format;
    }

    public Items setOwner(String owner_address){
        this.owner_address=owner_address;
        return this;
    }
}
