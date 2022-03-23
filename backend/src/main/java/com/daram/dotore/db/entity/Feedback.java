package com.daram.dotore.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "feedback")
public class Feedback {

    @Id
    @Column(name = "articleno", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int articleno;

    @NotNull
    @Column(name = "respondent")
    String respondent;

    @NotNull
    @Column(name = "description")
    String description;

    @NotNull
    LocalDateTime created_at;

    String imgUrl;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String address;

    @NotNull
    BigInteger tokenId;

    @Builder
    public Feedback(int articleno, String respondent, String description, LocalDateTime created_at, String imgUrl, String address, BigInteger tokenId) {
        this.articleno = articleno;
        this.respondent = respondent;
        this.description = description;
        this.created_at = created_at;
        this.imgUrl = imgUrl;
        this.address = address;
        this.tokenId = tokenId;
    }

    public Feedback updateFeedback(String description, String img_url){
        this.description=description;
        this.imgUrl=img_url;
        return this;
    }
}