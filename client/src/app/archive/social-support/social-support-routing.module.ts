import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialSupportPage } from './social-support.page';

const routes: Routes = [
  {
    path: '',
    component: SocialSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialSupportPageRoutingModule {}
