import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryFormPageRoutingModule } from './category-form.page.routing';

import { CategoryFormPage } from './category-form.page';
import { CategoryFormComponent } from '../../forms/category-form/category-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CategoryFormPageRoutingModule
  ],
  declarations: [CategoryFormPage, CategoryFormComponent]
})
export class CategoryFormPageModule {}
