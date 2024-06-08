import { Injectable } from '@angular/core';
import { Piso } from '../modelo/piso';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PisoService {
  url: string = `${environment.HOST}/piso`;
 
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Piso[]>(this.url);
  }

  

}