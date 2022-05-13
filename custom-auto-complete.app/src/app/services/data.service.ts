import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {

  constructor(private http : HttpClient) { }


  getFilterdCities(cityPrefix:string){
    const params = new HttpParams().set('cityPrefix', cityPrefix);
    return this.http.get(environment.apiUrl + '/api/Data/getFilterdCities',{params}).pipe(x => x);
  }
}
