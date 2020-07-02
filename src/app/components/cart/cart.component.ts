import { Component, OnInit } from '@angular/core';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';
import { getLocaleDateFormat } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {

  constructor(private encode: EncodeDecodeService,
              private message: MessageService) { }
  cart: any;
  items: any;
  totalPrice = 0;
  totalQty =0;
  parent: any;
  ngOnInit(): void {
  this.getData();
  }
  getData(){
    this.cart = this.encode.encrypting('cart');
    this.items = this.cart.find(x => x.status == true).items;
    this.totalPrice = 0;
    this.totalQty =0;
    for(let i in this.items){
        this.totalPrice = this.totalPrice + this.items[i].price*this.items[i].qty;
        this.totalQty = this.totalQty + this.items[i].qty;
      }
    this.parent =this.totalQty;
    console.log(this.totalPrice);
  }
  remove(index){
    this.items.find(x => x.id == index.id).qty=0;
    this.items = this.items.splice(this.items.findIndex(x => x.qty == 0),1);
    this.encode.decrypting('cart',this.cart);
    this.getData();
    this.rem();
  }
  add(index){
    this.items.find(x => x.id == index.id).qty++;
    this.encode.decrypting('cart',this.cart);
    this.getData();
    this.inc();
  }
  sub(index){
    this.items.find(x => x.id == index.id).qty--;
    if(this.items.find(x => x.id == index.id).qty == 0){
    this.items = this.items.splice(this.items.findIndex(x => x.qty == 0),1);
    }
    this.encode.decrypting('cart',this.cart);
    this.getData();
    this.dec();
  }
  inc() {
    this.message.add({severity: 'success', summary: 'Service Message', detail: 'One more added Successfully'});
}
  dec() {
  this.message.add({severity: 'success', summary: 'Service Message', detail: 'One subtracted Successfully'});
}
rem() {
  this.message.add({severity: 'success', summary: 'Service Message', detail: 'Removed Successfully'});
}
}
