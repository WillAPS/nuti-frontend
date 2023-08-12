import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DadosComponent extends AppComponent implements OnInit{
  
  dataSourcePagina: Pagina[] = [];
  dataSourceTag: Tag[] = [];
  expandedElement: Pagina | null = null;
  colunasPagina = ['id', 'url'];
  colunasTag = ['id', 'nome', 'quantidade'];

  constructor(private http: HttpClient,
              private router: Router){
    super();
  }

  ngOnInit(): void {
    this.buscarPaginas()
  }

  enviarNovasUrls(){
    this.router.navigate(['/']).then(() => {
      window.location.reload;
    });
  }

  buscarPaginas(){
    this.http.get<Pagina[]>(this.apiURL + '/dados-pagina')
      .subscribe(
        {next: (dados) => {
            console.log(dados)
            this.dataSourcePagina = dados
          },
        error: (erro) => console.log(erro)}
      )
  }

  buscarTags(pagina: Pagina){
    console.log(pagina)
    this.http.get<Tag[]>(`${this.apiURL}/dados-tag?idPagina=${pagina.id}`)
      .subscribe(
        {
          next: (dados) => {
            pagina.tags = dados
            console.log(dados)
          }
        }
      )
  }

  toggleRow(pagina: Pagina){
    pagina.expanded = !pagina.expanded
    if(pagina.expanded == true){
      this.buscarTags(pagina);
    }
  }
}

export interface Tag {
  id: number;
  nome: string;
  quantidade: number;
}

export interface Pagina {
  id: number;
  url: string;
  tags: Tag[];
  expanded: Boolean;
}