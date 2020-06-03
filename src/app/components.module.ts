import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { PopoverComponent } from './components/popover/popover.component';
import {PopoverEditComponent} from './components/popover-edit/popover-edit.component';
import {CommonModule} from '@angular/common';

@NgModule({
	declarations: [HeaderComponent, PopoverComponent, PopoverEditComponent],
	imports: [IonicModule, CommonModule],
	entryComponents: [PopoverComponent, PopoverEditComponent],
	exports: [HeaderComponent, PopoverComponent]
})
export class ComponentsModule {
}
