import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../classes/post';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }
  getTodoDetails(): Observable<object> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  getById(): Observable<any> {
    let param = new HttpParams().set("userId","1");
    return this.http.get("https://jsonplaceholder.typicode.com/posts",{params:param})
  }
  post(opost:Post): Observable<any> {
    return this.http.post("https://jsonplaceholder.typicode.com/posts",opost);
  }
  put(opost:Post): Observable<any> {
    return this.http.put("https://jsonplaceholder.typicode.com/posts/1",opost);
  }
  patch(opost:Post): Observable<any> {
    return this.http.patch("https://jsonplaceholder.typicode.com/posts/1",opost);
  }
  delete(): Observable<any> {
    return this.http.delete("https://jsonplaceholder.typicode.com/posts/1");
  }
}
