import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClothingPageRoutingModule } from './clothing-routing.module';

import { ClothingPage } from './clothing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClothingPageRoutingModule
  ],
  declarations: [ClothingPage]
})
export class ClothingPageModule {}
