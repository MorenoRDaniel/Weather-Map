import { Injectable } from '@angular/core';
import {Image} from '../models/image';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
  tempRegistry: object[] = [];
  apiKey: string;

  constructor( private http: HttpClient) {
    this.apiKey = '24bf346ecfdb8c2db2ee3ea466fe279f'; }

  getCityByName(city: string):Observable<any>{
    let apiUrl='http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + this.apiKey;
        return this.http.get(apiUrl);
  }

  getKey(): string {
        return this.apiKey;
    }

  saveLocalStorageTemperatures(name:string, temp:number){
    let date= new Date();
    this.tempRegistry.push({name, temp, date});
      localStorage.setItem("Temperatures", JSON.stringify(this.tempRegistry));
  }

  getLocalStorageTemperatures():string{
    return JSON.parse(localStorage.getItem("Temperatures"));
  }
}
