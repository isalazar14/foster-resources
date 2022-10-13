import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, skip, switchMap, tap } from 'rxjs/operators';
import { ResourceService } from '../../resource.service';
import { Category } from '../../models/category.model';
import { LoadingController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources-base',
  templateUrl: 'resources-base.page.html',
  styleUrls: ['resources-base.page.scss'],
})
export class ResourcesBasePage implements OnInit {
// export class ResourcesBasePage {
  categories: Observable<Category[]>;
  isUserAdmin = true;
  isManageModeOn = false;
  isLoading: boolean;
  splitPaneThreshold: string | false

  constructor(
    private resourceService: ResourceService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.splitPaneThreshold = "md"

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
}
