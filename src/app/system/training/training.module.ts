import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingPageRoutingModule } from './training-routing.module';

import { TrainingPage } from './training.page';

import { ComponentsModule } from '../../components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrainingPage]
})
export class TrainingPageModule {}
