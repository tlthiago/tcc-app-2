import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'bookmarks',
        loadChildren: () => import('../bookmarks/bookmarks.module').then(m => m.BookmarksPageModule)
      },
      {
        path: 'templates',
        loadChildren: () => import('../templates/templates.module').then(m => m.TemplatesPageModule)
      },
      {
        path: '',
        redirectTo: '/home/search',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
