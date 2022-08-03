import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  validarPaciente(cedula: string){
    const URL = `https://proyectomedidores.000webhostapp.com/img/ba_validaciopaciente.php?pa_cedula=${cedula}`;
    return this.http.get<any>(URL)
  }

  buscarPaciente(cedula: string){
    return this.http.get(`https://proyectomedidores.000webhostapp.com/img/bd_busqueda.php?pa_cedula=${cedula}`);
  }

  nuevoPaciente(data: any){
    const URL = 'https://proyectomedidores.000webhostapp.com/img/bd_insert_user.php';
    return this.http.post<any>(URL, data);
  }

  regExamenes(data: any){
    const URL = 'https://proyectomedidores.000webhostapp.com/img/bd_insertar_examen.php';
    return this.http.post<any>(URL, data);
  }

  getTiposExamenes() {
    const URL = 'https://proyectomedidores.000webhostapp.com/img/tipos_examenes.php';
    return this.http.get<any>(URL);
  }
}
