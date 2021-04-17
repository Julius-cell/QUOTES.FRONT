import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'quotes', loadChildren: () => import('./quotes/quotes.module').then(m => m.QuotesModule) },
  { path: '**', redirectTo: 'quotes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
