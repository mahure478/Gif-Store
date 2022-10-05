import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(private http: HttpClient) { }

  searchGif(data:string,limit:number): Observable<any> {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=PI5nuwdSrd9cAPACwGfhPQh34D4u9iDn&q=${data}&limit=${limit}&rating=g&lang=en`)
  }
}
