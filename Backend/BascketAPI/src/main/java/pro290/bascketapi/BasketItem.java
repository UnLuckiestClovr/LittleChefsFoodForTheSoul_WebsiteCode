/**
 * @author Kenneth
 * @createdOn 2024/05/20 at 9:03
 * @projectName BascketAPI
 * @packageName pro290.bascketapi;
 */

package pro290.bascketapi;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BasketItem {

    @JsonProperty("RID")
    private String RID;

    @JsonProperty("amount")
    private int amount;

    // Default constructor
    public BasketItem() {}

    // Parameterized constructor
    public BasketItem(String RID, int amount) {
        this.RID = RID;
        this.amount = amount;
    }

    // Getters and Setters
    public String getRID() {
        return RID;
    }

    public void setRID(String RID) {
        this.RID = RID;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
