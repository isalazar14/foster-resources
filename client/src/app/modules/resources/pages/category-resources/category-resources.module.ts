import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryResourcesPageRoutingModule } from './category-resources-routing.module';

import { CategoryResourcesPage } from './category-resources.page';
import { ResourcesModule } from '../../resources.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryResourcesPageRoutingModule,
    ResourcesModule
  ],
  declarations: [CategoryResourcesPage]
})
export class CategoryResourcesPageModule {}
