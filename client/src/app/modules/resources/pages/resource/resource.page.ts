import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { UiStateService } from 'src/app/ui-state.service';
import { Resource } from '../../models/resource.model';
import { ResourceService } from '../../resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.page.html',
  styleUrls: ['./resource.page.scss'],
})
export class ResourcePage implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    // private ui: UiStateService
  ) {}

  isLoading: boolean;
  // isLoading: Observable<boolean>;
  resource: Observable<Resource>;

  ngOnInit() {
    console.log('resource page init');
    this.isLoading = true;
    // this.isLoading = this.uiState.isLoading;
    this.resource = this.route.paramMap
      .pipe(
        map((params) => params.get('resourceId')),
      // tap((resourceId) => console.log(resourceId)),
        switchMap((resourceId:string) => this.resourceService.db.fetchResourceById(resourceId)),
      // this.resource = this.resourceService.getResourceIdFromUrl(this.route).pipe(
      // tap((resourceId => console.log(resourceId))),
      // switchMap((resourceId) => this.resourceService.db.fetchResourceById(resourceId)))
      // delay(2000),
      tap((resource) => {
        this.isLoading = false;
        console.log(resource);
      }))}
    // this.activeResource = this.route.paramMap.pipe(
    //   map((params) => {
    //     let result =  {
    //       category: params.get('category'),
    //       resourceId: params.get('resourceId'),
    //     };
    //     console.log(result)
    //     return result
    //   }),
    //   switchMap(({ category, resourceId }) =>
    //     this.resourceService.getResourcesByCategoryId.pipe(
    //       map((allResources) => {
    //         return allResources.get(category)?.find(resource => resource._id = resourceId)
    //         // let targetResource;
    //         // let categoryResources = allResources.get(category)
    //         // if (!categoryResources || categoryResources.length == 0){
    //         //   return this.resourceService.fetchResourceById(resourceId).pipe(take(1)).subscribe(resource => targetResource = resource)
    //         // }
    //         // else {
    //         //   targetResource = categoryResources.find(resource => resource._id = resourceId)
    //         // }
    //         // return targetResource
    //       })
    //     )
    //   )
    // )
    // .subscribe((resourceId) => this.resourceService.fetchResourceById(resourceId))

    // this.activeResource.subscribe(resource => {
    //   console.log(resource)
    //   if (!resource) {
    //     this.router.navigateByUrl('/resources')
    //   }
    // })
  // }
}