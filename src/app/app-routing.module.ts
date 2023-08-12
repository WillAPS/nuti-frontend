import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosComponent } from './dados/dados.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: 'dados', component: DadosComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
