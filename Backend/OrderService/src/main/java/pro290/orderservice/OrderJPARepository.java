/**
 * @author Kenneth
 * @createdOn 2024/05/02 at 11:42
 * @projectName OrderAPI
 * @packageName pro290.orderservice;
 */

package pro290.orderservice;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public abstract class OrderJPARepository implements JpaRepository<Order, UUID> {

}
