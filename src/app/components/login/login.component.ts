import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private Encode: EncodeDecodeService,
              private route: Router,
              private message: MessageService) { }
  LoginForm : FormGroup;
  object : any;
  userDetails: any;
  selectedUser: any;
  token = false;
  cart = [];
  cartObject : {user: string ,status: boolean, items : [{}] } ;
  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group(
      {
        email:['',Validators.required],
        password:['',Validators.required]
      })
  }

  CheckUser(){
    this.object = this.LoginForm.value;
    if(this.object.email == '' ||this.object.password == ''){
      this.showWarn();
      return false;
    }
    if(this.Encode.encrypting('cart')){
      this.cart = this.Encode.encrypting('cart');
    }
    this.userDetails = this.Encode.encrypting('UserDetails');
    this.selectedUser = this.userDetails.find(x => x.email == this.object.email);
    if(this.selectedUser){
      if(this.selectedUser.pass === this.object.password){
        this.token = true;
        this.Encode.decrypting('token', this.token);
        if(this.cart.find( x => x.user == this.object.email)){
          this.cart.find( x => x.user == this.object.email).status = true;
        }else{
        this.cartObject = {...this.cartObject, user: this.object.email,status: this.token}
        this.cart.push(this.cartObject);
        }
        this.Encode.decrypting('cart',this.cart);
        // this.addSingle();
        this.route.navigate(['/']);
      }
    }
    else{
      this.showError();
    }
  }
  addSingle() {
    this.message.add({severity: 'success', summary: 'Service Message', detail: 'Login Successfully'});
}
showError() {
    this.message.add({severity:'error', summary: 'Error Message', detail:'Wrong crendentials'});
}
showWarn() {
  this.message.add({severity:'warn', summary: 'Warn Message', detail:'No empty fields allowed'});
}

}
