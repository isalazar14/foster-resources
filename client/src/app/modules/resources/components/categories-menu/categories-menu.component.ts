import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ResourceService } from 'src/app/modules/resources/resource.service';
import { Category } from 'src/app/modules/resources/models/category.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
  // providers: [ResourceService]
})
export class CategoriesMenuComponent implements OnInit{
  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {}

  categories: Category[];
  isUserAdmin = true;
  isManageModeOn = false;
  isLoading: boolean;
  categoriesSub: Subscription;
  // loader: HTMLIonLoadingElement
  // searchBar = new FormControl('');
  // query: Observable<string>

  ngOnInit() {
    // console.log('home page OnInit');
    // this.categories = this.resourceService.categories.pipe(map(categories => [...categories.values()]));
    this.isLoading = true;
    this.categoriesSub = this.resourceService.data.getCategories().pipe().subscribe({
      next: (categories) => {
        if (categories) {
          // console.log(categories);
          // console.log('isLoading:', this.isLoading);
          this.categories = categories;
          this.isLoading = false;
          // console.log('isLoading:', this.isLoading);
        }
      },
    });
    // this.query = this.searchBar.valueChanges
  }

  ngOnDestroy(): void {
    this.categoriesSub.unsubscribe();
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
  

  searchResources(event) {
    // const searchBar = document.querySelector('ion-searchbar')
    // searchBar.getInputElement().then(input=> input.setAttribute('formControl','query'))
    // console.log('event.target:', event.target)
    // console.log('query:', event.target.value)

    this.router.navigate(["/resources/search"],{queryParams: {q: event.target.value}});
    event.target.value = ''

    // this.query.subscribe({next: (query) => {
    //   this.router.navigate(["/resources/search"],{queryParams: {q: query}});
    //   this.searchBar.reset()
    // }})
  }
}