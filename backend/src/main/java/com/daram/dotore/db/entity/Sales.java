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
@Table(name = "sales")
public class Sales {

    @Id
    @Column(name = "sale_trx_hash", nullable = false, unique = true)
    String saleTrxHash;

    @Column(name = "sale_id")
    int saleId;

    @NotNull
    @Column(name = "token_id")
    BigInteger tokenId;

    String cashContractAddress;

    @NotNull
    Boolean saleYn;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String sellerAddress;

    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String buyerAddress;

    @NotNull
    String price;

    @NotNull
    LocalDateTime createdAt;

    LocalDateTime completedAt;

    @NotNull
    String status;

    @Builder
    public Sales(String saleTrxHash, int saleId, BigInteger tokenId,
        String cashContractAddress, Boolean saleYn, String sellerAddress, String buyerAddress,
        String price, LocalDateTime createdAt, LocalDateTime completedAt, String status) {
        this.saleTrxHash = saleTrxHash;
        this.saleId = saleId;
        this.tokenId = tokenId;
        this.cashContractAddress = cashContractAddress;
        this.saleYn = saleYn;
        this.sellerAddress = sellerAddress;
        this.buyerAddress = buyerAddress;
        this.price = price;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
        this.status = status;
    }

    public Sales setOnSaleYn(boolean onSaleYn) {
        this.saleYn = onSaleYn;
        return this;
    }

    public Sales setBuyerAddress(String buyerAddress) {
        this.buyerAddress = buyerAddress;
        return this;
    }

    public Sales setCompletedAt(LocalDateTime time) {
        this.completedAt = time;
        return this;
    }

    public Sales setSaleId(int saleId) {
        this.saleId = saleId;
        return this;
    }

    public Sales setStatus(String status) {
        this.status = status;
        return this;
    }
}