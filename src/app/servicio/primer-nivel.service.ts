import { Injectable } from '@angular/core';
import { PrimerNivel } from '../modelo/primer-nivel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrimerNivelService {

  url: string = `${environment.HOST}/primerNivel`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<PrimerNivel[]>(this.url);
  }

  

}