import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonDetailPageRoutingModule } from './person-detail-routing.module';

import { PersonDetailPage } from './person-detail.page';
import {ComponentsModule} from '../../components.module';
import {ModalTrainComponent} from '../modal-train/modal-train.component';

@NgModule({
    entryComponents: [ModalTrainComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonDetailPageRoutingModule,
        ComponentsModule,
    ],
  declarations: [PersonDetailPage, ModalTrainComponent]
})
export class PersonDetailPageModule {}
