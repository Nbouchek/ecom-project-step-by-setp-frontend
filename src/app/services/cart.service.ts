import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  constructor() {}
  addToCart(theCartItem: CartItem) {
    // check if we always have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0) {
      // find the item in th cart based on item id
      existingCartItem = this.cartItems.find(
        (theItem) => theItem.id === theCartItem.id
      );

      // check if we found it
      alreadyExistsInCart = existingCartItem !== undefined;
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

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      (tempItem) => tempItem.id === theCartItem.id
    );
    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const iterator of this.cartItems) {
      totalPriceValue += iterator.quantity * iterator.unitPrice;
      totalQuantityValue += iterator.quantity;
    }

    // publish the new values  -- all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Content of the cart");
    for (const iterator of this.cartItems) {
      const subTotalPrice = iterator.quantity * iterator.unitPrice;
      console.log(
        `\tname = ${iterator.name}, \n\tquantity = ${
          iterator.quantity
        }, \n\tunitPrice = ${
          iterator.unitPrice
        }, \n\tsubTotalPrice = ${subTotalPrice.toFixed(2)}`
      );
    }

    console.log(
      `\n\ttotalPrice: ${totalPriceValue.toFixed(
        2
      )}, \n\ttotalQuantity: ${totalQuantityValue}`
    );
    console.log("-----");
  }
}
