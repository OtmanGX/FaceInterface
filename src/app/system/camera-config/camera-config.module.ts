import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraConfigPageRoutingModule } from './camera-config-routing.module';

import { CameraConfigPage } from './camera-config.page';
import {ComponentsModule} from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    CameraConfigPageRoutingModule
  ],
  declarations: [CameraConfigPage]
})
export class CameraConfigPageModule {}
