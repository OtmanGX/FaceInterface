import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationPageRoutingModule } from './configuration-routing.module';

import { ConfigurationPage } from './configuration.page';
import {ComponentsModule} from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ConfigurationPageRoutingModule
  ],
  declarations: [ConfigurationPage]
})
export class ConfigurationPageModule {}
