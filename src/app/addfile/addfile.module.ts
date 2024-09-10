import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfilePageRoutingModule } from './addfile-routing.module';

import { AddfilePage } from './addfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfilePageRoutingModule
  ],
  declarations: [AddfilePage]
})
export class AddfilePageModule {}
