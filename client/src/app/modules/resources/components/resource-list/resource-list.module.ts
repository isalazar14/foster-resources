import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceListComponentRoutingModule } from './resource-list.routing';

import { ResourceList } from './resource-list.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    // ResourceListComponentRoutingModule
  ],
  // declarations: [ResourceList],
  // exports: [ResourceList]
})
export class ResourceListComponentModule {}
