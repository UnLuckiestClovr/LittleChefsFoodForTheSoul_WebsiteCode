package pro290.orderservice;

import jakarta.persistence.*;
import org.hibernate.annotations.Array;
import org.hibernate.annotations.CollectionType;
import org.hibernate.bytecode.enhance.spi.EnhancementInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class RecipeOrder
{
    @Id
    private UUID OID;
    private UUID UID;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> Items = new ArrayList<>();
    public RecipeOrder(UUID oid, UUID uid, List<OrderItem> items)
    {
        setOID(oid);
        setUID(uid);
        setItems(items);
    }

    public RecipeOrder() {

    }

    public UUID getOID() {
        return OID;
    }

    public void setOID(UUID OID) {
        this.OID = OID;
    }

    public UUID getUID() {
        return UID;
    }

    public void setUID(UUID UID) {
        this.UID = UID;
    }

    public List<OrderItem> getItems() {
        return Items;
    }

    public void setItems(List<OrderItem> items) {
        Items = items;
    }
}
