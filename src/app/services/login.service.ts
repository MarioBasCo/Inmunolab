import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  iniciarSesion(usuario: string, clave: string){
    return this.http.get<any>(`https://proyectomedidores.000webhostapp.com/img/bd_user.php?login=${usuario}&&clave=${clave}`);
  }
}
