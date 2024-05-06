/**
 * @author Kenneth
 * @createdOn 2024/05/06 at 11:19
 * @projectName OrderAPI
 * @packageName pro290.orderservice;
 */

package pro290.orderservice;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem
{
    @Id
    @GeneratedValue
    private Long id;

    private String itemId;

    @ManyToOne
    private RecipeOrder order;

    public OrderItem(String itemId) {
        this.itemId = itemId;
    }

    public OrderItem() {

    }

    // Getters and setters
    public Long getOrderItemId()
    {
        return this.id;
    }
    public String getItemId()
    {
        return this.itemId;
    }
    
}

