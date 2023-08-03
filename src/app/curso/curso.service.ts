import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Curso } from './curso';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  //URL
  url = "http://localhost:83/api/php/"

  //Vetor
  vetor: Curso[] = [];

  //Construtor
  constructor(private http: HttpClient) { }

   //Cadastrar curso
   cadastrarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.url + 'cadastrar.php', curso)
  }


  //Alterar curso
  alterarCurso(curso:Curso):Observable<Curso>{
    return this.http.put<Curso>(this.url + 'alterar', curso)
  }


  // listar cursos
  obterCursos():Observable<Curso[]>{
    return this.http.get(this.url+"listar")
    .pipe( map((res:any) =>{
       this.vetor = res;
       return this.vetor;
      }))
  }

  //Remover curso
  removerCurso(id: any): Observable<Curso>
  {
    //id do cruso via urlex.: http://localhost:83/api/php/excluir?idCurso=3
    const url = `${this.url}excluir?idCurso=${id}`
    console.log(url);
    return this.http.delete<Curso>(url)
  }


}


