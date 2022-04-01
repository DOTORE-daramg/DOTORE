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
    String itemHash;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9ㄱ-ㅎ가-힣 ]{1,100}")
    String itemTitle;

    @NotNull
    String itemDescription;

    @NotNull
    LocalDateTime createdAt;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String authorAddress;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String ownerAddress;

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
    public Items(String itemTrxHash, BigInteger tokenId, String itemHash, String itemTitle,
        String itemDescription, LocalDateTime createdAt, String authorAddress,
        String ownerAddress, boolean on_sale_yn, boolean is_first, String format, String status) {
        this.itemTrxHash = itemTrxHash;
        this.tokenId = tokenId;
        this.itemHash = itemHash;
        this.itemTitle = itemTitle;
        this.itemDescription = itemDescription;
        this.createdAt = createdAt;
        this.authorAddress = authorAddress;
        this.ownerAddress = ownerAddress;
        this.onSaleYn = on_sale_yn;
        this.isFirst = is_first;
        this.format = format;
        this.status = status;
    }

    public Items setTokenId(BigInteger tokenId) {
        this.tokenId = tokenId;
        return this;
    }

    public Items setOwner(String owner_address) {
        this.ownerAddress = owner_address;
        return this;
    }

    public Items setOnSaleYn(boolean onSaleYn) {
        this.onSaleYn = onSaleYn;
        return this;
    }

    public void setItemHash(String itemHash) {
        this.itemHash = itemHash;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
