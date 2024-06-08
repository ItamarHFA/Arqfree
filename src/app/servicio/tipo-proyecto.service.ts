import { Injectable } from '@angular/core';
import { TipoProyecto } from '../modelo/tipo-proyecto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {

  url: string = `${environment.HOST}/tipoProyecto`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<TipoProyecto[]>(this.url);
  }

  

}