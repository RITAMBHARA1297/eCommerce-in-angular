import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  constructor(private fromBuilder: FormBuilder,
              private Encode: EncodeDecodeService,
              private route:Router,
              private message: MessageService) { }
  signupForm: FormGroup;
  object:any;
  user = [];
  previousData = [];
  ngOnInit(): void {
    this.signupForm = this.fromBuilder.group({
      name:['',Validators.required],
      number:['',Validators.required],
      email:['',Validators.required],
      Gender:['',Validators.required],
      pass:['',Validators.required]
    })
  }

  addUser(){
    this.object = this.signupForm.value;
    if (this.object.name === '' || this.object.email === '' || this.object.number === '' || this.object.password === '') {
      console.log('empty');
      this.error();
      return false;
    }
    this.previousData = this.Encode.encrypting('UserDetails');
    if (this.previousData) {
    this.user = this.previousData; 
    }
    if (this.previousData !== null) {
      if (this.previousData.find(x => x.email === this.object.email)) {
        alert('Already Exist');
        return false;
      }
    }
    this.user = [...this.user, this.object];
    this.Encode.decrypting('UserDetails', this.user);
    alert('Login Successfull!!!');
    this.route.navigate(['/login']);

  }
  
error() {
  this.message.add({severity: 'error', summary: 'Error Message', detail: 'Please fill the form properly'});
}
}
