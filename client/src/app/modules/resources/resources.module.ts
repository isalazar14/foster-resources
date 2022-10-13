import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourcesRoutingModule } from './resources.routing';
import { ResourceService } from './resource.service';
import { ResourceListComponentModule } from './components/resource-list/resource-list.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CategoriesMenuComponent } from './components/categories-menu/categories-menu.component';
import { ResourcesBasePage } from './components/resources-base/resources-base.page';
import { ResourceList } from './components/resource-list/resource-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ResourcesRoutingModule,
    // FormsModule
  ],
  declarations: [
    // CategoriesMenuComponent,
    ResourcesBasePage,
    ResourceList
  ],
  // providers: [ResourceService],
  exports: [ResourceList]
})
export class ResourcesModule {}
