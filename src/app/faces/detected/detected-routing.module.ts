import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectedPage } from './detected.page';

const routes: Routes = [
  {
    path: '',
    component: DetectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetectedPageRoutingModule {}
