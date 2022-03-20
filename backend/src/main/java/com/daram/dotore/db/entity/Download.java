package com.daram.dotore.db.entity;

import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "download")
public class Download {

    @Id
    @Column(name = "download_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int downloadId;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String address;

    @NotNull
    @Column(name = "token_id")
    BigInteger tokenId;

    @Builder
    public Download(int downloadId, String address, BigInteger tokenId) {
        this.downloadId = downloadId;
        this.address = address;
        this.tokenId = tokenId;
    }
}