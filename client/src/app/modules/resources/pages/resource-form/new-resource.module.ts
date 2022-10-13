import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewResourcePageRoutingModule } from './new-resource.routing';

import { NewResourcePage } from './new-resource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewResourcePageRoutingModule
  ],
  declarations: [NewResourcePage]
})
export class NewResourcePageModule {}
