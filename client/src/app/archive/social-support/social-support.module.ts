import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialSupportPageRoutingModule } from './social-support-routing.module';

import { SocialSupportPage } from './social-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialSupportPageRoutingModule
  ],
  declarations: [SocialSupportPage]
})
export class SocialSupportPageModule {}
