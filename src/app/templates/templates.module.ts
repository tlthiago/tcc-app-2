import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesPage } from './templates.page';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: TemplatesPage }])],
  declarations: [TemplatesPage],
  exports: [TemplatesPage],
})
export class TemplatesPageModule {}