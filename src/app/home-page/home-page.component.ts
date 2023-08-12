import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends AppComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private _snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(){
    {
      this.form = this.formBuilder.group({
        urls: ['', Validators.required]
      })
    }
  }

  visualizarDados(){
    this.router.navigate(['/dados']).then(() => {
      window.location.reload;
    });
  }

  enviarUrls(form: FormGroup){
    this.http.post(this.apiURL, form.get('urls')?.value)
      .subscribe(
        {
          next: (dados) => {
            console.log(dados)
            this.openSnackBarSucesso()
          },
          error: (erro) => {
            console.log(erro)
            this.openSnackBarErro()
          }
        }
      )
  }

  openSnackBarSucesso() {
    this._snackBar.open('URL(s) processadas com sucesso!!', 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500
    });
  }

  openSnackBarErro() {
    this._snackBar.open('Erro ao processar URL(s) tente novamente!!', 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500
    });
  }

}
