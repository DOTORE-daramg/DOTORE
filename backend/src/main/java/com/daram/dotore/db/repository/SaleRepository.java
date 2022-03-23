package com.daram.dotore.db.repository;

import com.daram.dotore.db.entity.Feedback;
import com.daram.dotore.db.entity.Sales;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sales, Integer> {
    Optional<Sales> findByTokenIdAndSaleYn(BigInteger tokenId, boolean saleYn);
}
