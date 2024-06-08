import { Injectable } from '@angular/core';
import { TercerNivel } from '../modelo/tercer-nivel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TercerNivelService {

  url: string = `${environment.HOST}/tercerNivel`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<TercerNivel[]>(this.url);
  }

  

}