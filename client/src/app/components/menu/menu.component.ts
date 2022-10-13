import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from 'src/app/modules/resources/resource.service';
import { Category } from 'src/app/modules/resources/models/category.model';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // providers: [ResourceService]
})
export class MenuComponent implements OnInit{
  // categories: Category[];
  categories: Observable<Category[]>;
  isUserAdmin = true;
  isManageModeOn = false;
  isLoading: boolean;

  constructor(
    private resourceService: ResourceService,
  ) { }

  ngOnInit(): void {
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
} 
