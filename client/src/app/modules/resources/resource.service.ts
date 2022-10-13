import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, fromEventPattern, Observable } from 'rxjs';
import {
  delay,
  filter,
  map,
  shareReplay,
  skip,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Resource } from './models/resource.model';
import { Category } from './models/category.model';
import { ActivatedRoute } from '@angular/router';
import { UiStateService } from 'src/app/ui-state.service';

type DbOptions = {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: string | number;
};

@Injectable({ providedIn: 'root' })
export class ResourceService {
  constructor(private http: HttpClient, private uiState: UiStateService) {
    this.initCategories();
  }
  //#region PROPERTIES

  private API_PORT = 8000;
  private API_BASE_URL = `http://localhost:${this.API_PORT}/api`;

  //#region STATE PROPS
  private _data = {
    categories: new BehaviorSubject<Category[]>(null),
    resources: new BehaviorSubject<Resource[]>(null),
    activeCategory: new BehaviorSubject<Category>(null),
    activeResource: new BehaviorSubject<Resource>(null),
  };

  private _preferences = new BehaviorSubject<{ [key: string]: any }>({
    lists: {
      home: { sortBy: 'createdAt', sortOrder: 'desc' },
      category: { sortBy: 'name', sortOrder: 'asc' },
      search: { sortBy: 'name', sortOrder: 'asc' },
    },
  });

  private _categoryUrlNameIdMap = new BehaviorSubject<Map<string, number>>(
    new Map<string, number>()
  );

  //#endregion STATE PROPS

  //#endregion PROPERTIES

  //#region GETTERS
  data = {
    getCategories: () =>
      this._data.categories.asObservable().pipe(
        filter((categories) => categories != null),
        shareReplay()
      ),
    getCategoryById: (categoryId) =>
      this._data.categories
        .asObservable()
        .pipe(
          map((categories) =>
            categories.find((category) => category._id == categoryId)
          )
        ),
    getResources: () =>
      this._data.resources
        .asObservable()
        .pipe(filter((resources) => resources != null)),
    getActiveCategory: () =>
      this._data.activeCategory
        .asObservable()
        .pipe(filter((category) => category != null)),
    getActiveResource: () =>
      this._data.activeResource
        .asObservable()
        .pipe(filter((resource) => resource != null)),
  };

  getCategoryByUrlName(urlName: string) {
    return this._data.categories.pipe(
      map((categories) =>
        categories.find(
          (category) =>
            category.urlFriendlyName == urlName || category.name == urlName
        )
      )
    );
  }

  get preferences() {
    return this._preferences.asObservable();
  }

  get categoryUrlNameIdMap() {
    return this._categoryUrlNameIdMap.asObservable();
  }

  getActiveCategoryIdFromUrlNameIdMap(categoryUrlName: string) {
    const activeCategoryId =
      this._categoryUrlNameIdMap.value.get(categoryUrlName);
    return activeCategoryId;
  }

  getResourcesByCategoryId(categoryId: string) {
    return this._data.resources.pipe(
      map((resources) =>
        resources.filter((resource) => resource.categories.includes(categoryId))
      )
    );
  }

  // getResourcesByCategoryId(categoryId: string) {
  //   if (!this._resourcesByCategoryId.value.has(categoryId)) {
  //     this.db
  //       .fetchResourcesByCategory(categoryId)
  //       .pipe(
  //         map((fetchedResources) => {
  //           let updatedResources = new Map<string, Resource[]>(
  //             this._resourcesByCategoryId.value
  //           );
  //           updatedResources.set(categoryId, fetchedResources);
  //           return updatedResources;
  //         })
  //       )
  //       .subscribe({
  //         next: (updatedResources) =>
  //           this._resourcesByCategoryId.next(updatedResources),
  //         error: (error) => {
  //           console.error(error);
  //           throw new Error(`Error fetching "${categoryId}" resources`);
  //         },
  //       });
  //   }
  //   return this.getResourcesByCategoryId.pipe(
  //     map((allResources) => allResources.get(categoryId))
  //   );
  // }

  //#endregion GETTERS

  //#region SETTERS / UPDATERS
  setCategories(value: Category[]) {
    this._data.categories.next(value);
    // console.log('updated categories');
  }

  setResources(value: Resource[]) {
    this._data.categories.next(value);
    // console.log('updated categories');
  }

  setActiveResource(resourceId: string) {
    let resource = this._data.resources.value.find(
      (resource) => resource._id == resourceId
    );
    if (resource) this._data.activeResource.next(resource);
    else
      this.db
        .fetchResourceById(resourceId)
        .subscribe((resource) => this._data.activeResource.next(resource));
  }

  setActiveCategory(categoryId: string) {
    let resource = this._data.categories.value.find(
      (category) => category._id == categoryId
    );
    if (resource) this._data.activeCategory.next(resource);
    else
      this.db
        .fetchResourceById(categoryId)
        .subscribe((category) => this._data.activeCategory.next(category));
  }

  setPreferences(updatedPreferences: any) {
    this._preferences.next(updatedPreferences);
  }

  addCategoryToList(newCategory: Category) {
    let updatedCategories = this._data.categories.value.concat(newCategory);
    console.log('updated category list', updatedCategories);
    this.setCategories(updatedCategories);
  }

  addCategoryToNameIdMap({ name, urlFriendlyName = null }: Category, index) {
    this._categoryUrlNameIdMap.value.set(urlFriendlyName || name, index);
    // let updatedMap = this._categoryUrlNameIdMap.value.set(urlFriendlyName || name, _id)
    // this._categoryUrlNameIdMap.next(updatedMap)
  }

  editCategoryInList(editedCategory: Category) {
    let updatedCategories = this._data.categories.value.map((cat) =>
      cat._id == editedCategory._id ? editedCategory : cat
    );
    console.log(updatedCategories);
    this._data.categories.next(updatedCategories);
  }

  removeCategoryFromList(categoryId: string) {
    this._data.categories.next(
      this._data.categories.value.filter((cat) => cat._id != categoryId)
    );
  }

  // updateResourceState(category: string, data: Resource[]) {}

  // updateResourceState(category: string, data: Resource) {}

  //#endregion SETTERS / UPDATERS

  //#region HELPERS
  initCategories() {
    // console.log('initializing resource service');
    // if (
    //   !this._data.categories.value ||
    //   this._data.categories.value.length == 0
    // ) {
    this.db.fetchCategories().subscribe({
      next: (categories) => {
        this._data.categories.next(categories);
        // categories.forEach((category, i) =>
        //   this.addCategoryToNameIdMap(category, i)
        // );
        // console.log(categories);
        // this._categoryUrlNameIdMap.next(this._categoryUrlNameIdMap.value);

        // console.log('initializing category list')
        // console.log('category urlName-id map', this._categoryUrlNameIdMap.value)
      },
      error: (error) => {
        console.error(error);
      },
    });
    // }
  }
  //#endregion HELPERS

  //#region API CALLS

  private _db = {
    /**
     * @param apiEndpoint leading slash required (ex. "/endpoint/path")
     */
    fetchFromDb: <T>(apiEndpoint: string, options?: DbOptions) => {
      this.uiState.setLoading(true);
      let queryParams = [];
      if (options?.limit) queryParams.push(`limit=${options.limit}`);
      if (options?.sortBy) queryParams.push(`sortBy=${options.sortBy}`);
      if (options?.offset) queryParams.push(`offset=${options.offset}`);
      if (options?.sortOrder)
        queryParams.push(`sortOrder=${options.sortOrder}`);
      const queryString = '?' + queryParams.join('&');
      return this.http
        .get<T>(this.API_BASE_URL + apiEndpoint + queryString)
        .pipe(
          delay(2000),
          tap((items) => {
            // console.log(items)
            this.uiState.setLoading(false);
          })
        );
    },
  };

  db = {
    fetchCategories: () => {
      // console.log('fetching categories');
      // this._isLoading.next(true);
      // this.ui.state.setLoading(true);
      return this._db.fetchFromDb<Category[]>('/categories', { limit: 0 }).pipe(
        // delay(2000),
        tap((categories) => {
          categories.forEach((category, i) =>
            this.addCategoryToNameIdMap(category, i)
          );
          this._categoryUrlNameIdMap.next(this._categoryUrlNameIdMap.value);
          // this.ui.state.setLoading(false);
        })
      );
    },

    createCategory: (category: Category) => {
      // this._isLoading.next(true);
      return this.http.post<Category>(
        `${this.API_BASE_URL}/categories`,
        category
      );
      // .pipe(
      //   delay(2000),
      //   tap(() => this._isLoading.next(false))
      // );
    },
    editCategory: (category: Category) => {
      // this._isLoading.next(true);
      return this.http.put<Category>(
        `${this.API_BASE_URL}/categories/${category._id}`,
        category
      );
      // .pipe(
      //   delay(2000),
      //   tap(() => this._isLoading.next(false))
      // );
    },

    deleteCategory: (category: Category) => {
      // this._isLoading.next(true);
      return this.http.delete<Category>(
        `${this.API_BASE_URL}/categories/${category._id}`
      );
      // .pipe(
      //   delay(2000),
      //   tap(() => this._isLoading.next(false))
      // );
    },

    fetchResourceById: (resourceId: string) => {
      // this._isLoading.next(true);
      return this._db.fetchFromDb<Resource>(`/resources/${resourceId}`);
      // .pipe(
      //   delay(2000),
      //   tap(() => this._isLoading.next(false))
      // );
    },

    fetchResources: (options?: DbOptions) => {
      // this._isLoading.next(true);
      return this._db
        .fetchFromDb<Resource[]>('/resources', (options = null))
        .pipe(
          // delay(2000)
          tap((resources) => console.log(resources))
          // filter((resources) => !!resources)
        );
    },

    fetchResourcesByCategoryId: (categoryId: string, options?: DbOptions) => {
      // this._isLoading.next(true);
      return this._db.fetchFromDb<Resource[]>(
        `/resourcesByCategoryId/${categoryId}`,
        (options = null)
      );
      // .pipe(
      //   delay(2000),
      //   tap(() => this._isLoading.next(false))
      // );
    },

    fetchResourcesBySearch: (query: string, options?: DbOptions) => {
      // this._isLoading.next(true);
      const encodedQuery = encodeURIComponent(
        query.trim().replace(/\s+/g, '+')
      );
      return this._db.fetchFromDb<Resource[]>(
        '/resources',
        options ? { q: encodedQuery, ...options } : { q: encodedQuery }
      );
      // .pipe(
      //   delay(2000),
      //   tap(() => this._isLoading.next(false))
      // );
    },
  };

  //#endregion API CALLS
}
