import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookmarksPage } from './bookmarks.page';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule, 
    IonicModule, 
    RouterModule.forChild([{ path: '', component: BookmarksPage }])],
  declarations: [BookmarksPage],
  exports: [BookmarksPage],
})
export class BookmarksPageModule {}