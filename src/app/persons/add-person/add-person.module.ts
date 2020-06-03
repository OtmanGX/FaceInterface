import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPersonPageRoutingModule } from './add-person-routing.module';

import { AddPersonPage } from './add-person.page';
import {ComponentsModule} from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ComponentsModule,
    AddPersonPageRoutingModule
  ],
  declarations: [AddPersonPage]
})
export class AddPersonPageModule {}
