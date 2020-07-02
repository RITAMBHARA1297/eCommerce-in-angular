import { Component, OnInit } from '@angular/core';
import{ Event, Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, ActivatedRoute} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  showLoading = true;
constructor(private router: Router,
            private encode: EncodeDecodeService,
            private message: MessageService,
            private route: ActivatedRoute) {
  this.router.events.subscribe((routerEvent: Event) => {
    if(routerEvent instanceof NavigationStart){
      this.showLoading = true;
    }
    if(routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError){
      this.showLoading = false;
    }
  })
 }
 product = [
   {id: 1 , name : 'Floral Print', price : 45.3, qty: 1},
   {id: 2 , name : 'Party Perfect', price : 65.2, qty: 1},
   {id: 3 , name : 'Dark Maroon Dress', price : 50, qty: 1},
   {id: 4 , name : 'Casual Dress', price : 67, qty: 1},
   {id: 5 , name : 'Formal Pant', price : 49.8, qty: 1},
   {id: 6 , name : 'Orange Strip', price : 55.78, qty: 1}
 ]
 valueLogin = 'Login';
 token = false;
 cart : any;
 items: any;
 totalQty = 0;
 parent:any;
 productSelected = [  ];
 cartStatus = false;
 object;
 userName;
  ngOnInit(): void {
    this.getData();
    this.storeData();
    this.showData();
    if(this.token){
      this.cartStatus = true;
      this.valueLogin = 'Log Out';
    }
  }
  showData(){
    this.route.params.subscribe(params => this.object = params);//url value
    this.userName = this.object.UserName;
    console.log(this.userName);
  }
  getData(){
    this.token = this.encode.encrypting('token');
    this.cart = this.encode.encrypting('cart');
  }
  storeData(){
    this.encode.decrypting('product',this.product);
  }

 addToCart(index){
   if(this.token){
      if(this.cart.find(x => x.status == true).items == undefined){
      this.productSelected = [...this.productSelected, this.product.find( x => x.id == index)];
      this.cart.find(x => x.status == true).items = this.productSelected;
    }else{
      if(this.cart.find(x => x.status == true).items.find(x => x.id == index)){
        this.cart.find(x => x.status == true).items.find(x => x.id == index).qty++ ;
        }else{
          this.cart.find(x => x.status == true).items = [...this.cart.find(x => x.status == true).items, this.product.find( x => x.id == index)]
        }
    }
    this.items = this.cart.find(x => x.status == true).items;
    this.totalQty =0;
    for(let i in this.items){
        this.totalQty = this.totalQty + this.items[i].qty;
      }
    this.parent =this.totalQty;
    this.encode.decrypting('cart', this.cart);
    this.addSingle();
   }else{
     this.showWarn();
   }
  }
  showWarn() {
    this.message.add({severity:'warn', summary: 'Warn Message', detail:'Login first'});
}
  addSingle() {
    this.message.add({severity: 'success', summary: 'Service Message', detail: 'Added t0 cart'});
}
}
