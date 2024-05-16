/**
 * @author Kenneth
 * @createdOn 2024/05/06 at 11:19
 * @projectName OrderAPI
 * @packageName pro290.orderservice;
 */

package pro290.orderservice;


import java.util.UUID;


import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue
    private Long id;

    private String itemId;

    @ManyToOne
    @JoinColumn(name = "recipe_order_id")
    private RecipeOrder order;

    public OrderItem(String itemId) {
        this.itemId = itemId;
    }

    // No-arg constructor for JPA
    public OrderItem() {
    }

    // Getters and setters
    public Long getId() {
        return this.id;
    }

    public String getItemId() {
        return this.itemId;
    }

    public void setOrder(RecipeOrder order) {
        this.order = order;
        // Ensure bidirectional relationship is maintained
        if (order != null) {
            order.getItems().add(this);
        }
    }
}

