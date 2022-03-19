package com.daram.dotore.db.entity;

import java.math.BigInteger;
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
@Table(name = "format")
public class Format {

    @Id
    @Column(name = "token_id", nullable = false, unique = true)
    BigInteger tokenId;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,10}")
    String format;

    @Builder
    public Format(BigInteger tokenId, String format) {
        this.tokenId = tokenId;
        this.format = format;
    }
}