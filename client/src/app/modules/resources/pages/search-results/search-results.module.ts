import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultsPageRoutingModule } from './search-results-routing.module';

import { SearchResultsPage } from './search-results.page';
import { ResourcesModule } from '../../resources.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchResultsPageRoutingModule,
    ResourcesModule
  ],
  declarations: [SearchResultsPage]
})
export class SearchResultsPageModule {}
