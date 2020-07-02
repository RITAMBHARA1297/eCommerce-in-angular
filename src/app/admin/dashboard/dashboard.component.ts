import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private encode: EncodeDecodeService) { }
  cartValue: any;
  userValue: any;
  displayValue: {name: string, number: any, email: string, cart: [{}]};
  display= [];
  ngOnInit(): void {
    this.getData();
    this.showData();
  }
  getData(){
    this.cartValue = this.encode.encrypting('cart');
    this.userValue = this.encode.encrypting('UserDetails');
    console.log('cart==>',this.cartValue);
    console.log('user==>',this.userValue);
  }
  showData(){
    for(let i in this.userValue){
      this.displayValue = { ...this.displayValue,
                            name: this.userValue[i].name,
                            number: this.userValue[i].number,
                            email: this.userValue[i].email,
                            cart : this.cartValue.find(x => x.user == this.userValue[i].email).items};
      this.display.push(this.displayValue);
    }
    console.log('Daisplay==>',this.display);
  }

}
