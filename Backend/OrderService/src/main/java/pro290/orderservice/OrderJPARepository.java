/**
 * @author Kenneth
 * @createdOn 2024/05/02 at 11:42
 * @projectName OrderAPI
 * @packageName pro290.orderservice;
 */

package pro290.orderservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

public interface OrderJPARepository extends JpaRepository<RecipeOrder, UUID> 
{
    
}
