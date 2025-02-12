/**
 * @author Kenneth
 * @createdOn 2024/05/02 at 11:51
 * @projectName Pro290
 * @packageName pro290.orderservice;
 */

package pro290.orderservice;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("")
public class OrderRest
{
    @Autowired
    private OrderJPARepository or;

    @GetMapping(path = "test")
	@ResponseStatus(code = HttpStatus.I_AM_A_TEAPOT)
	public String Test() {
		return "Please Work";
	}

    @GetMapping()
    @ResponseStatus(code = HttpStatus.OK)
    public List<RecipeOrder> GetAllOrders()
    {
        return or.findAll();
    }

    @PostMapping(path = "/create/{UID}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void CreateAnOrder(@RequestBody List<OrderItem> items, @PathVariable String UID) 
    {
        RecipeOrder order = new RecipeOrder();
        UUID orderID = UUID.randomUUID();
        order.setId(orderID);
        order.setUid(UID);

        for (OrderItem orderItem : items) {
            orderItem.setOrder(order); // Ensure bidirectional relationship
        }

        System.out.println("Received order items: " + items); // Debugging

        or.save(order);
    }

    @PutMapping(path = "/{OID}")
    @ResponseStatus(code = HttpStatus.OK)
    public void UpdateOrder(@RequestBody List<OrderItem> items, @PathVariable UUID OID)
    {
        Optional<RecipeOrder> Oorder = or.findById(OID);
        if(!Oorder.isPresent()) { System.out.println("No Order found"); return; }

        RecipeOrder order = Oorder.get();

        order.getItems().clear();

        for (OrderItem orderItem : items) {
            orderItem.setOrder(order); // Ensure bidirectional relationship
        }

        System.out.println("Order for OID");

        or.save(order);

    }

    @GetMapping(path = "/getallorder/{UID}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<RecipeOrder> GetAllOrdersByUID(@PathVariable String uid)
    {
        List<RecipeOrder> orders = or.findAll();
        List<RecipeOrder> usersOrders = new ArrayList<>();

        for (RecipeOrder recipeOrder : orders) {
            if(recipeOrder.getUid() == uid)
            {
                usersOrders.add(recipeOrder);
            }
        }
        return usersOrders;
    }

    @DeleteMapping(path = "/{OID}")
    @ResponseStatus(code = HttpStatus.OK)
    public void DeleteOrder(@PathVariable UUID OID)
    {
        or.delete(or.findById(OID).get());
    }
}
