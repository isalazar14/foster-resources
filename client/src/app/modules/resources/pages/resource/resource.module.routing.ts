import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcePage } from './resource.page';

const routes: Routes = [
  
  {
    path: '',
    pathMatch: 'full',
    component: ResourcePage
  },
  // {
  //   path: ':resourceId',
  //   pathMatch: 'full',
  //   component: ResourcePage
  // },
  // {
  //   path: ':resourceId/edit', 
  //   pathMatch: 'full',
  //   // loadChildren: () => import('./resource/resource.module').then(m => m.ResourcePageModule)
  //   loadChildren: () => import('../new-resource/new-resource.module').then( m => m.NewResourcePageModule)
  //   // component: ResourcePage
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcePageRoutingModule {}
