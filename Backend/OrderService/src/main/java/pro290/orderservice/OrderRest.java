/**
 * @author Kenneth
 * @createdOn 2024/05/02 at 11:51
 * @projectName Pro290
 * @packageName pro290.orderservice;
 */

package pro290.orderservice;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
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

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public void CreateAnOrder(@RequestBody RecipeOrder order)
    {
        order.setOID(UUID.randomUUID());
        order.setUID(order.getUID());
        or.save(order);
    }
}
