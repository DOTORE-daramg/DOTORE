package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Download;
import java.math.BigInteger;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DownloadRepository extends JpaRepository<Download, Integer> {
    Optional<Download> findByAddressAndTokenId(String address, BigInteger tokenId);
    int countByTokenId(BigInteger tokenId);
}
