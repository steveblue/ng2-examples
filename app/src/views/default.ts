import { Component } from "angular2/core";

import { Media } from "../models/media";
import { ProductList } from "../directives/product-list";

@Component({
  directives: [ProductList],
  template: `
  <div class="inventory-app">
    <products-list
      [productList]="products"
      (onProductSelected)="productWasSelected($event)">
    </products-list>
  </div>
`
})

export class Default {
  message: String;
  products: Array<any>;
  constructor() {

    this.products = [
            new Media(
            'MYSHOES', 'Black Running Shoes', '/resources/images/products/black-shoes.jpg', 'This is a description.',
            2),
            new Media(
            'NEATOJACKET', 'Blue Jacket', '/resources/images/products/blue-jacket.jpg', 'This is a description.', 5),
            new Media(
            'NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', 'This is a description.',
            3)
            ];

    console.log(this.products);

  }

  productWasSelected(product: Media): void {
    console.log('Product clicked: ', product);
  }
}
