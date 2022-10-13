import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, skip, tap } from 'rxjs/operators';
import { ResourceService } from './modules/resources/resource.service';
import { Category } from './modules/resources/models/category.model';
import { Observable } from 'rxjs';
// import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  // providers: [ResourceService]
})
export class AppComponent implements OnInit {
  // categories: Category[];
  categories: Observable<Category[]>;
  isUserAdmin = true;
  isManageModeOn = false;
  isLoading: boolean;

  constructor(
    // private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,

    private resourceService: ResourceService,
    private router: Router
  ) {
    // this.initializeApp();
  }

  ngOnInit(): void {
    // console.log('app component OnInit');
    this.isLoading = true;
    this.categories = this.resourceService.data.getCategories().pipe(
      tap({
        next: () => {
          this.isLoading = false;
        },
      })
    );
  }

  toggleManageMode() {
    this.isManageModeOn = !this.isManageModeOn;
  }

  goToResourcesOrEdit(category) {
    let url = [category.urlFriendlyName || category.name];
    if (this.isManageModeOn) {
      url.push('edit');
    }
    // console.log(url)
    return url;
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }
}
