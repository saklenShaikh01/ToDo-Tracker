import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = "https://mailthis.to/TodoTracker"
  constructor(private http: HttpClient){}

    SendEmail(input: any) {
	return this.http.post(this.url, input,{responseType: 'text'}).pipe(
    map(
      (response:any)=>{
        if(response){
          return response;
        }
      },
      (error:any)=>{
        return error;
      }
    )
  )
    }
}
