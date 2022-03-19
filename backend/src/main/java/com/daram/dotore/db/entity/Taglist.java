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
@Table(name = "taglist")
public class Taglist {

    @Id
    @Column(name = "tag_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int tagId;

    @Column(name = "token_id")
    @NotNull
    BigInteger tokenId;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,20}")
    String tag;

    @Builder
    public Taglist(int tagId, BigInteger tokenId, String tag) {
        this.tagId = tagId;
        this.tokenId = tokenId;
        this.tag = tag;
    }
}
