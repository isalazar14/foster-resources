import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryResourcesPage } from './category-resources.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryResourcesPageRoutingModule {}
