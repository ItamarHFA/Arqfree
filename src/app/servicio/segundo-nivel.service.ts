import { Injectable } from '@angular/core';
import { SegundoNivel } from '../modelo/segundo-nivel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegundoNivelService {

  url: string = `${environment.HOST}/segundoNivel`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<SegundoNivel[]>(this.url);
  }

  

}