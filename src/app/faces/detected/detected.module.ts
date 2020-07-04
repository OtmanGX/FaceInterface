import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationComponent } from '../../components/pagination/pagination.component';
import { IonicModule } from '@ionic/angular';

import { DetectedPageRoutingModule } from './detected-routing.module';

import { DetectedPage } from './detected.page';

import { ComponentsModule } from '../../components.module';
import {PopoverEditComponent} from '../../components/popover-edit/popover-edit.component';
import {MoveComponent} from './move/move.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
    entryComponents: [MoveComponent, FilterComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetectedPageRoutingModule,
        ComponentsModule,
    ],
    exports: [
        PaginationComponent
    ],
    declarations: [DetectedPage, PaginationComponent, MoveComponent, FilterComponent]
})
export class DetectedPageModule {}
