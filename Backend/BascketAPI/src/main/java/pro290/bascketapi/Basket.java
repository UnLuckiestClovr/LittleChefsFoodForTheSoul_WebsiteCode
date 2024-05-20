/**
 * @author Kenneth
 * @createdOn 2024/05/20 at 9:02
 * @projectName BascketAPI
 * @packageName pro290.bascketapi;
 */

package pro290.bascketapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Basket {

    @JsonProperty("BID")
    private UUID BID;

    @JsonProperty("items")
    private List<BasketItem> items;

    // Default constructor
    public Basket() {}

    // Getters and Setters
    public UUID getBID() {
        return BID;
    }

    public void setBID(UUID BID) {
        this.BID = BID;
    }

    public List<BasketItem> getItems() {
        return items;
    }

    public void setItems(List<BasketItem> items) {
        this.items = items;
    }
}
