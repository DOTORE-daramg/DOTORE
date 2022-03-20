package com.daram.dotore.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.context.annotation.Configuration;

/**
 * Spring Data JPA 관련 추가 설정 정의.
 */
@Configuration
public class JpaConfig {

    @PersistenceContext
    EntityManager entityManager;
}
