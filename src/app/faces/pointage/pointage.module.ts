import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointagePageRoutingModule } from './pointage-routing.module';

import { PointagePage } from './pointage.page';
import {ComponentsModule} from "../../components.module";
import {DetectedPageModule} from "../detected/detected.module";
import { FilterComponent } from './filter/filter.component';

@NgModule({
  entryComponents: [FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PointagePageRoutingModule,
    DetectedPageModule
  ],
  declarations: [PointagePage, FilterComponent]
})
export class PointagePageModule {}
