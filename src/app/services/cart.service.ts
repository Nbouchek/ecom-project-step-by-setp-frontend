import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartItems: CartItem[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {}
  addToCart(theCartItem: CartItem) {
    // check if we always have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in th cart based on item id
      for (const iterator of this.cartItems) {
        if (iterator.id === theCartItem.id) {
          existingCartItem = iterator;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart toal price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQUantityValue: number = 0;

    for (const iterator of this.cartItems) {
      totalPriceValue += iterator.unitPrice * iterator.unitPrice;
      totalQUantityValue += iterator.quantity;
    }

    // publish the new values  -- all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQUantityValue);

    // log cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQUantityValue);
  }
  logCartData(totalPriceValue: number, totalQUantityValue: number) {
    console.log("Content of the cart");
    for (const iterator of this.cartItems) {
      const subTotalPrice = iterator.quantity * iterator.unitPrice;
      console.log(
        `name = ${iterator.name}, quantity = ${iterator.quantity}, unitPrice=${iterator.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQUantityValue}`
    );
    console.log("-----");
  }
}
