import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Curso } from './curso';
import { CursoService } from './curso.service';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})

export class CursoComponent implements OnInit {

  //URL base
  url = 'http://localhost:83/api/php/';


  //Vetor de cursos
  vetor: Curso[] = [];

  //Objeto da Classe Curso
  curso = new Curso();

  //Construtor
  constructor(
    //private http: HttpClient,
    private curso_service: CursoService
    ) {}

  //Inicializador
  ngOnInit(){
    //Ao inicializar o sistema, listar os cursos
    this.selecao();
  }


  //Selecionar
  selecao(){
    console.log('call selecao component');
    this.curso_service.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    );
  }

  // salvar(){
  //   //se o ID do curso for undefined quer dizer que é um NOVO CURSO, ou seja, necessita cadastrar!
  //   if(this.curso.idCurso == undefined)
  //   {
  //     this.cadastro();
  //     //chama o método de cadastro
  //   } else
  //   {
  //     this.alterar();
  //     //se o curso tem ID é pq ele foi selecionado, ouo seja, podemos excluir ou alterar. Neste caso, ao clicar em salvar, como faz a verifcação do ID, se for diferente de UNDEFINED, ele vai para ELSE, será chamado de método alterar
  //   }


  //Cadastrar
  cadastro(){
    //listagem dos dados no console
    //console.log("Em curso.component cadastro() " + "cursoNome: " + this.curso.cursoNome + " valorCurso: " + this.curso.valorCurso )
    this.curso_service.cadastrarCurso(this.curso).subscribe(
      (res: Curso) => {
        //Limpar os atributos
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        //Atualizar listagem com o novo cadastro
        this.selecao();
      }
    );
  }

  //Alterar
  alterar(){
    this.curso_service.alterarCurso(this.curso).subscribe(
      (res: Curso) => {

        alert("Curso de ID " +this.curso.idCurso+" alterado com sucesso!")

        //Limpar os dados do curso
        this.curso.idCurso = undefined;
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
        this.selecao();
        }
      );
  }

  //Remover
  remover(): void {
    this.curso_service.removerCurso(this.curso.idCurso).subscribe(
      (res : Curso) => {
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
        this.selecao();
      }
    )
  }

  //Selecionar um curso específico na tabela
  selecionarCurso(c: Curso) {
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
    console.log("Curso selecionado: ", this.curso.nomeCurso + "id: " + this.curso.idCurso)
  }

}

