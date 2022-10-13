import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iif, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { Resource } from '../../models/resource.model';
import { ResourceService } from '../../resource.service';

@Component({
  selector: 'app-category-resources',
  templateUrl: './category-resources.page.html',
  styleUrls: ['./category-resources.page.scss'],
})
export class CategoryResourcesPage implements OnInit {

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute
  ) {}

  resources: Observable<Resource[]>;
  category: Observable<Category>;
  categorySub: Subscription;

  ngOnInit() {
    // /* use category name from url */
    // this.category = this.route.paramMap.pipe(
    //   switchMap((params) =>
    //     this.resourceService.data.getCategories().pipe(
    //       map((categories) => {
    //         /** get category name from url */
    //         let categoryFromUrl = params.get('category');
    //         /** get corresponding category object from state */
    //         return categories.find(
    //           (category) =>
    //             category.urlFriendlyName == categoryFromUrl ||
    //             category.name == categoryFromUrl
    //         );
    //       })
    //       // tap((category) => {
    //       //   this.resources =
    //       //     this.resourceService.db.fetchResourcesByCategoryId(
    //       //       category._id
    //       //     );
    //       // })
    //     )
    //   )
    // );

    /* use category id from url */
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId')
      this.category = this.resourceService.data.getCategoryById(categoryId)
      this.resources = this.resourceService.db.fetchResourcesByCategoryId(categoryId) 

    }
    );

    
  }
}
