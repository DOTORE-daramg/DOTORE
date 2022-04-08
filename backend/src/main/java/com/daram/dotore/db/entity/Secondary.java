package com.daram.dotore.db.entity;

import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "secondary")
public class Secondary {

    @Id
    @Column(name = "second_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int secondId;

    @Column(name = "token_id")
    BigInteger tokenId;

    @NotNull
    BigInteger original;

    @NotNull
    @Column(name = "item_trx_hash")
    String itemTrxHash;

    @Builder
    public Secondary(int secondId, BigInteger tokenId, BigInteger original, String itemTrxHash) {
        this.secondId = secondId;
        this.tokenId = tokenId;
        this.original = original;
        this.itemTrxHash = itemTrxHash;
    }
}
