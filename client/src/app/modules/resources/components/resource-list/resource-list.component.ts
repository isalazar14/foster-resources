import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { ResourceService } from '../../resource.service';
import { Resource } from '../../models/resource.model';
import { Category } from '../../models/category.model';

type ResourceListMode = 'home' | 'category' | 'search';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  // standalone: true
})
export class ResourceList implements OnInit, OnDestroy {
  @Input() resources: Observable<Resource[]>;
  // category: Category;
  category: Observable<Category>;
  categorySub: Subscription;
  mode: ResourceListMode;
  isLoading: boolean;
  query: string;
  // title: string

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit() {}

  ngOnInit() {
    // this.isLoading = true
    if (this.router.url.endsWith('resources')) {
      this.mode = 'home';
      /* No category, show most recent */
      console.log('init home mode');
      
    } else if (this.router.url.includes('category')) {
      this.mode = 'category';
      console.log('init category mode');
      this.category = this.route.paramMap.pipe(
        switchMap((params) =>
          this.resourceService.data.getCategories().pipe(
            map((categories) => {
              /** get category name from url */
              let categoryFromUrl = params.get('category');
              /** get corresponding category object from state */
              return categories.find(
                (category) =>
                  category.urlFriendlyName == categoryFromUrl ||
                  category.name == categoryFromUrl
              );
            })
            // tap((category) => {
            //   this.resources =
            //     this.resourceService.db.fetchResourcesByCategoryId(
            //       category._id
            //     );
            // })
          )
        )
      );
      /** get category resources  */
      this.categorySub = this.category.subscribe((category) => {
        this.resources = this.resourceService.db.fetchResourcesByCategoryId(
          category._id
        );
      });
    } else if (this.router.url.includes('search')) {
      this.mode = 'search';
      console.log('init search mode');
      this.route.queryParamMap
        .pipe(map((params) => params.get('q')))
        .subscribe({
          next: (query) => {
            console.log(query);
            if (!this.mode || !query) {
              throw new Error('either mode or param is missing');
              // console.log('either mode or param is missing');
              // console.log('mode:', this.mode);
              // console.log('param:', query);
              this.router.navigateByUrl('/resources');
              return;
            } else {
              this.query = query;
              this.resources = this.resourceService.db
                .fetchResourcesBySearch(query)
                .pipe(
                  tap(() => {
                    this.isLoading = false;
                    console.log('search init complete');
                  })
                );
            }
          },
        });
    }
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');
  }

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
    // console.log("unsub'd from _activeResourceRoute")
  }

  // getActiveCategoryId() {
  //   return (
  //     this.route.paramMap.pipe(map((params) => params.get('category')))
  //     .subscribe((categoryFromUrl) =>
  //       this._categoryUrlNameIdMap.value.get(categoryFromUrl as string)
  //     )
  //   );
  // }

  getCategoryFromPath() {
    return this.route.paramMap.pipe(
      map((params) => {
        console.log(params.get('category'));
        return params.get('category');
      })
    );
  }
}
