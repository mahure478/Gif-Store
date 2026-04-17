import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GiphyImage {
  id: string;
  images: {
    original: {
      url: string;
    };
  };
}

export interface GiphySearchResponse {
  data: GiphyImage[];
}

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private readonly API_KEY = 'PI5nuwdSrd9cAPACwGfhPQh34D4u9iDn';
  private readonly BASE_URL = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) { }

  searchGif<T>(data: string, limit: number): Observable<T> {
    const url = `${this.BASE_URL}?api_key=${this.API_KEY}&q=${encodeURIComponent(data)}&limit=${limit}&rating=g&lang=en`;
    return this.http.get<T>(url);
  }
}
