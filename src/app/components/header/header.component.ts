import { Component, OnInit, Input } from  '@angular/core';
import {IonRouterOutlet, PopoverController} from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  title: string;

  constructor(public popoverController: PopoverController,
              private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
