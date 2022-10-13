import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'resources',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/resources/resources.module').then((m) => m.ResourcesModule),
  },
  {
    path: 'user',
    pathMatch: 'prefix',
    loadChildren: () => import('./modules/user/user.module').then( m => m.UserModule)
  },
  {
    path: '**',
    redirectTo: 'resources',
    // loadChildren: () => import('./modules/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
