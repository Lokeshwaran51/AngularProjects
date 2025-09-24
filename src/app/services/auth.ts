import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = '/db.json';
  constructor(private http:HttpClient){
  }

  getAllEmployees(){
    return this.http.get(this.baseUrl);
  }

  getEmloyeeById(id:any){
    return this.http.get(this.baseUrl + "/" + id);
  }

  createEmployee(obj:any){
    return this.http.post(this.baseUrl, obj);  
  }

  updateEmployee(id:any, obj:any){
    return this.http.put(this.baseUrl + "/" + id, obj)
  }

  deleteEmployee(id:any){
    return this.http.delete(this.baseUrl + "/" + id);
  }

}
