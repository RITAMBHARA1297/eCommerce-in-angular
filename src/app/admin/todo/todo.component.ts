import { Component, OnInit } from '@angular/core';
import { EncodeDecodeService } from 'src/app/services/encode-decode.service';
import { CrudService } from '../services/crud.service';
import { NgStyle } from '@angular/common';
import { Post } from '../classes/post';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  users: any;
  usersById: any;
  todoget: any;
  todogetId: any;
  todopost:any;
  status;
  value=[];
  opost;
  objPost: Post;
  objPut: Post;
  objPatch: Post;
  deleteMsg: string;
  constructor(private todo: CrudService,private encode: EncodeDecodeService) { }

  ngOnInit(): void {
    this.getDetails();
    this.showData();
    this.postDemo();
    this.putDemo();
    this.patchDemo();
  }
  getDetails(){
    this.todo.getTodoDetails().subscribe(resp => {
      this.users = resp ;
      console.log(this.users);
      this.encode.decrypting('crud',this.users);
    });
    this.todo.getById().subscribe(data =>{
      this.usersById = data;
      console.log(this.usersById);
      this.encode.decrypting('crudById',this.usersById);
    });
  }
  showData(){
    this.todoget = this.encode.encrypting('crud');
    this.todogetId = this.encode.encrypting('crudById');
    this.todopost = this.encode.encrypting('postData');;
  }
  normalget(){
    this.value = this.todoget;
  }
  normalgetid(){
    this.value = this.todogetId;
  }
  normalpost(){
    this.value = [...this.value,this.objPost];
  }
  normalput(){
    this.value = [...this.value,this.objPut];
  }
  normalpatch(){
    this.value = [...this.value,this.objPatch];
  }
  normaldelete(){
    this.todo.delete().subscribe(data => {
      this.deleteMsg = "Resource Deleted Successfully";
    })
  }
  updateLocal(index, updatedValue: string) {
    index.title = updatedValue;
    this.encode.decrypting('crud',this.value);
  }
  deleteLocal(index) {
    if (confirm('Are You Sure??')) {
     this.value.splice(this.todoget.indexOf(index), 1);
     this.encode.decrypting('crud',this.value);
    } else {
      return false;
    }
  }
  check_true() {
    this.status = true;
  }
  check_false() {
    this.status = false;
  }
  postDemo(){
    var opost = new Post();
    opost.title = "Ritambhara";
    opost.body = "Done";
    opost.userId = 3;
    console.log(opost);
    this.todo.post(opost).subscribe( data =>{
      this.objPost = data;
      console.log('post obj==',this.objPost);
      this.encode.decrypting('postData',this.objPost);
    });
  }
  putDemo(){
    var opost = new Post();
    opost.title = "Updated Title";
    opost.body = "Updated body";
    opost.userId = 1;
    console.log(opost);
    this.todo.put(opost).subscribe(data =>{
      this.objPut = data;
      console.log('put obj==',this.objPut);
      this.encode.decrypting('putData',this.objPut);
    });
  }
  patchDemo(){
    var opost = new Post();
    opost.title = "Patched Title";
    console.log(opost);
    this.todo.patch(opost).subscribe(data =>{
      this.objPatch = data;
      console.log('patch obj==',this.objPatch);
      this.encode.decrypting('patchData',this.objPatch);
    });
  }
}
