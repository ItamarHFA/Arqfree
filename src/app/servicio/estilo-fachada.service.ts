import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstiloFachada } from '../modelo/estilo-fachada';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstiloFachadaService {
  url: string = `${environment.HOST}/estiloFachada`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<EstiloFachada[]>(this.url);
  }

  

}
