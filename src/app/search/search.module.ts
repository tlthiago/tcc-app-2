import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchPage } from './search.page';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule, 
    RouterModule.forChild([{ path: '', component: SearchPage }])],
  declarations: [SearchPage],
  exports: [SearchPage],
})
export class SearchPageModule {}