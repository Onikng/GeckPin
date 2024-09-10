import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddfilePage } from './addfile.page';

const routes: Routes = [
  {
    path: '',
    component: AddfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddfilePageRoutingModule {}
