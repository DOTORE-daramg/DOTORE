package com.daram.dotore.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "answer")
public class Answer {

    @Id
    @Column(name = "answerno", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int answerNo;

    @NotNull
    @Column(name = "writer")
    String writer;

    @NotNull
    @Column(name = "description")
    String description;

    @NotNull
    LocalDateTime createdAt;

    String imgUrl;

    @NotNull
    int articleNo;

    @Builder
    public Answer(int answerNo, String writer, String description, LocalDateTime createdAt, String imgUrl, int articleNo) {
        this.answerNo = answerNo;
        this.writer = writer;
        this.description = description;
        this.createdAt = createdAt;
        this.imgUrl = imgUrl;
        this.articleNo = articleNo;
    }

    public Answer updateAnswer(String description, String img_url){
        this.description=description;
        this.imgUrl=img_url;
        return this;
    }
}