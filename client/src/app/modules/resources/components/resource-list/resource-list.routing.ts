import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceList } from './resource-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ResourceList
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceListComponentRoutingModule {}
