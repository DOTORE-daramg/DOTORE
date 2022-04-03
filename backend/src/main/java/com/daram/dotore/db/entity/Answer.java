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
    int answerno;

    @NotNull
    @Column(name = "writer")
    String writer;

    @NotNull
    @Lob
    @Column(name = "description")
    String description;

    @NotNull
    LocalDateTime createdAt;

    @NotNull
    int articleno;

    @Builder
    public Answer(int answerno, String writer, String description, LocalDateTime createdAt, String imgUrl, int articleno) {
        this.answerno = answerno;
        this.writer = writer;
        this.description = description;
        this.createdAt = createdAt;
        this.articleno = articleno;
    }

    public Answer updateAnswer(String description){
        this.description=description;
        return this;
    }
}