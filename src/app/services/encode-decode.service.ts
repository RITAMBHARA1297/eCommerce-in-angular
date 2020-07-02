import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeDecodeService {

  constructor() { }
  encrypting(x) {
    return JSON.parse(localStorage.getItem(x));
   }
   decrypting(x, y) {
     return localStorage.setItem(x, JSON.stringify(y));
   }
}
