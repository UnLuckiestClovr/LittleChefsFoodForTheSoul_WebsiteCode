/**
 * @author Kenneth
 * @createdOn 2024/05/20 at 9:06
 * @projectName BascketAPI
 * @packageName pro290.bascketapi;
 */

package pro290.bascketapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/basket")
public class BasketRest
{
    @Autowired
    private BasketService basketService;

    @GetMapping(path = "test")
    @ResponseStatus(code = HttpStatus.I_AM_A_TEAPOT)
    public String Test() {
        return "Please Work";
    }

    @PostMapping("/save") // Not Create will need to provide basket BID
    public void saveBasket(@RequestBody Basket basket) {
        basketService.saveBasket(basket);
    }

    @GetMapping("/{id}")
    public Basket getBasket(@PathVariable UUID id) {
        return basketService.getBasket(id);
    }
}
