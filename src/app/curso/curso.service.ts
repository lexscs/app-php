import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Curso } from './curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService implements OnInit {


  //URL
  url = "http://localhost:83/api/php/"

  //Vetor
  vetor: Curso[] = [];

  //Construtor
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  // Obter todos os cursos
  getCursos() : Observable<Curso[]> {
    return this.http.get(`${this.url}/listar`).pipe(
      map((resposta: any) => {
      this.vetor = resposta['cursos'];
        return this.vetor;
      }),
    )
  }


  //Cadastrar curso
  cadastrarCurso(c: Curso): Observable<Curso[]> {
    console.log(this.url+'cadastrar.php',c);
    return this.http.post(this.url + 'cadastrar.php', {cursos: c})
    .pipe(map((res) => {
      this.vetor.push(res["cursos"]);
      return this.vetor;
    }))
  }

  //Remover curso
  removerCurso(c: Curso): Observable<Curso[]> {
    const params = new HttpParams().set("idCurso", c.idCurso.toString());

    console.log(this.url); // testar se o id esta indo na url
      return this.http.delete(this.url + 'excluir.php', {params: params})
      .pipe(map((res) => {

        const filtro = this.vetor.filter((curso) => {
          return curso["idCurso"] !== c.idCurso;
        });
        return this.vetor = filtro;
      }))
  }


  // listar curso
  obterCursos(): Observable<Curso[]> {
    return this.http.get(this.url + "listar")
      .pipe(map((res: any) => {  //tipar o res com any
        this.vetor = res; // remover o res['curso']
        return this.vetor;
      }))
  }

  //Atualizar curso
  atualizarCurso(c: Curso): Observable<Curso[]> {


    //Executa a alteração via URL
    return this.http.put(this.url+"alterar.php", {cursos: c})
       //Percorre o vetor p/ encontrar o id do curso alterado
      .pipe(map((res) => {
        const cursoAlterado = this.vetor.find((item) => {
          return item['idCurso'] === +['idCurso'];
        });

        //Quando encontrado, altera o valor do vetor local
        if (cursoAlterado) {
          cursoAlterado['nomeCurso'] = c['nomeCurso'];
          cursoAlterado['valorCurso'] = c['valorCurso'];
        }
        return this.vetor;
      }),
    )
  }

}
