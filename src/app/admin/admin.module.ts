import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import{ AdminRoutingModule} from './admin-routing.module';
import { TodoComponent } from './todo/todo.component';
import { CrudService } from './services/crud.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [DashboardComponent, AdminComponent, TodoComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  providers: [CrudService]
})
export class AdminModule { }
