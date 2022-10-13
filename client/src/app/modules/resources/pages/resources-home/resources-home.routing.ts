import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesHomePage } from './resources-home.page';

const routes: Routes = [
  {
    path: '',
    component: ResourcesHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesHomePageRoutingModule {}
