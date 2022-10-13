import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourcesHomePageRoutingModule } from './resources-home.routing';

import { ResourcesHomePage } from './resources-home.page';
import { ResourcesModule } from '../../resources.module';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    ResourcesHomePageRoutingModule,
    ResourcesModule
  ],
  declarations: [ResourcesHomePage]
})
export class ResourcesHomePageModule {}
