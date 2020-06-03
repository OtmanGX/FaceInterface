import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonsPageRoutingModule } from './persons-routing.module';

import { PersonsPage } from './persons.page';

import { ComponentsModule } from '../../components.module';

import { PopoverEditComponent } from '../../components/popover-edit/popover-edit.component';

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PersonsPageRoutingModule
  ],
  declarations: [PersonsPage]
})
export class PersonsPageModule {}
