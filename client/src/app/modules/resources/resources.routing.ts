import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesBasePage } from './components/resources-base/resources-base.page';

const routes: Routes = [
	{
		path: '',
    pathMatch: 'prefix',
    component: ResourcesBasePage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/resources-home/resources-home.module').then(m => m.ResourcesHomePageModule),
      },
      {
        path: 'search',
        pathMatch: 'prefix',
        loadChildren: () => import('./pages/search-results/search-results.module').then(m => m.SearchResultsPageModule),
      },
      {
        path: 'categories',
        pathMatch: 'full',
        loadChildren: () => import('./pages/categories/categories.page.module').then(m => m.CategoriesPageModule),
      },
      {
        path: 'categories/new',
        pathMatch: 'full',
        // canActivate: ,
        loadChildren: () => import('./pages/category-form/category-form.page.module').then( m => m.CategoryFormPageModule)
      },
      {
        path: 'category/:categoryId/:category',
        pathMatch: 'full',
        loadChildren: () => import('./pages/category-resources/category-resources.module').then(m => m.CategoryResourcesPageModule),
      },
      {
        path: 'category/:categoryId/:category/edit',
        pathMatch: 'full',
        // canActivate: ,
        loadChildren: () => import('./pages/category-form/category-form.page.module').then( m => m.CategoryFormPageModule)
      },
      {
        path: 'category/:category/:resourceId',
        pathMatch: 'full',
        loadChildren: () => import('./pages/resource/resource.module').then(m => m.ResourcePageModule),
      },
      {
        path: 'new',
        pathMatch: 'full',
        // canActivate: ,
        loadChildren: () => import('./pages/resource-form/new-resource.module').then( m => m.NewResourcePageModule)
      },
      {
        path: ':resourceId/edit', 
        pathMatch: 'full',
        // canActivate: ,
        loadChildren: () => import('./pages/resource-form/new-resource.module').then( m => m.NewResourcePageModule)
      },
      {
        path: ':resourceId',
        pathMatch: 'full',
        loadChildren: () => import('./pages/resource/resource.module').then(m => m.ResourcePageModule),
      },
    ]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
