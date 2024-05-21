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
@RequestMapping("")
public class BasketRest
{
    @Autowired
    private BasketService basketService;

    @GetMapping(path = "test")
    @ResponseStatus(code = HttpStatus.I_AM_A_TEAPOT)
    public String Test() {
        return "Please Work";
    }

    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public UUID CreateBasket()
    {
        UUID holda = UUID.randomUUID();
        Basket basket = new Basket();
        basket.setBID(holda);
        basketService.saveBasket(basket);
        return holda;
    }

    @PostMapping("/save") // Not Create will need to provide basket BID
    @ResponseStatus(code = HttpStatus.CREATED)
    public void SaveBasket(@RequestBody Basket basket) {
        basketService.saveBasket(basket);
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public Basket GetBasket(@PathVariable UUID id) {
        return basketService.getBasket(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public String DeleteBasket(@PathVariable UUID id)
    {
        if(basketService.getBasket(id) == null) return "No Basket Found";

        basketService.deleteBasket(id);
        return "Basket was deleted";
    }
}
