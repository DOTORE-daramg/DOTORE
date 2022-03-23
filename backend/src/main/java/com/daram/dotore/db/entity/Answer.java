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
@Table(name = "answer")
public class Answer {

    @Id
    @Column(name = "answerno", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int answerno;

    @NotNull
    @Column(name = "writer")
    String writer;

    @NotNull
    @Column(name = "description")
    String description;

    @NotNull
    LocalDateTime created_at;

    String imgUrl;

    @NotNull
    int articleno;

    @Builder
    public Answer(int answerno, String writer, String description, LocalDateTime created_at, String imgUrl, int articleno) {
        this.answerno = answerno;
        this.writer = writer;
        this.description = description;
        this.created_at = created_at;
        this.imgUrl = imgUrl;
        this.articleno = articleno;
    }

    public Answer updateAnswer(String description, String img_url){
        this.description=description;
        this.imgUrl=img_url;
        return this;
    }
}