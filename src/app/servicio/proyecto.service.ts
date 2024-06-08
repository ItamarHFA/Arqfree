import { Injectable } from '@angular/core';
import { Proyecto } from '../modelo/proyecto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: string = `${environment.HOST}/proyecto`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Proyecto[]>(`${this.url}/hoy`);
  }

  registrar(examen: Proyecto) {
    return this.http.post(this.url, examen);
  }
  

}