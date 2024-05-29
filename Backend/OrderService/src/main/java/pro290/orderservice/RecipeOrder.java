package pro290.orderservice;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class RecipeOrder {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "UID")
    private String uid;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    // Constructors
    public RecipeOrder(UUID oid, String uid, List<OrderItem> items) {
        this.id = oid;
        this.uid = uid;
        this.items = items;
        // Ensure bidirectional relationship is maintained
        for (OrderItem item : items) {
            item.setOrder(this);
        }
    }

    public RecipeOrder() {
    }

    // Getters and setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    
    public void setItems(List<OrderItem> items) {
        this.items = items;
        // Ensure bidirectional relationship is maintained
        for (OrderItem item : items) {
            item.setOrder(this);
        }
    }
}
