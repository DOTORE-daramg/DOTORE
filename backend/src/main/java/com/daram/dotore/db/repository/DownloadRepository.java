package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Download;
import java.math.BigInteger;
import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DownloadRepository extends JpaRepository<Download, Integer> {

    Optional<Download> findByAddressAndTokenId(String address, BigInteger tokenId);
    int countByTokenId(BigInteger tokenId);

    @Query(value = "SELECT download_id,address,token_id "
            + "FROM download "
            + "WHERE address = :address", nativeQuery = true)
    List<Download> findDownloadByAddress(@Param("address") String address);
}
