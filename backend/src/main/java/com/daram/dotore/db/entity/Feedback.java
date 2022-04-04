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
    @Lob
    @Column(name = "description")
    String description;

    @NotNull
    LocalDateTime createdAt;

    @NotNull
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String address;

    @NotNull
    BigInteger tokenId;

    @Builder
    public Feedback(int articleno, String respondent, String description, LocalDateTime createdAt, String imgUrl, String address, BigInteger tokenId) {
        this.articleno = articleno;
        this.respondent = respondent;
        this.description = description;
        this.createdAt = createdAt;
        this.address = address;
        this.tokenId = tokenId;
    }

    public Feedback updateFeedback(String description){
        this.description=description;
        return this;
    }
}