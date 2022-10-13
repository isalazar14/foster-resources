import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { ResourcesModule } from './modules/resources/resources.module';
import { UserModule } from './modules/user/user.module';
import { ResourceService } from './modules/resources/resource.service';
// import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ResourcesModule,
    // StoreModule.forRoot({}, {}),
    // UserModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // ResourceService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
