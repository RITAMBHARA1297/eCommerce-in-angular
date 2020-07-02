import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private router: Router,
    private encode: EncodeDecodeService) { }

  valueLogin = 'Login';
  token = false;
  cartStatus = false;
  cart:any;
  @Input() child;
  ngOnInit(): void {
    this.getData();
    if(this.token){
      this.cartStatus = true;
      this.valueLogin = 'Log Out';
    }
  }
  getData(){
    this.token = this.encode.encrypting('token');
    this.cart = this.encode.encrypting('cart');
  }

  Login(){
    if(this.token){
      this.token = false;
      this.cartStatus = false;
      this.encode.decrypting('token', this.token);
      this.cart.find(x=> x.status ==  true).status = false;
      this.encode.decrypting('cart',this.cart);
      alert('Thank You!!');
      this.valueLogin = 'Login'
      this.router.navigate(['/']);
    }else{
       this.router.navigate(['/login']);
    }
  }
}
