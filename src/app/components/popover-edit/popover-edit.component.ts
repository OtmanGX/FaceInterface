import {Component, Input, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {PersonsService} from '../../services/persons.service';
import {ActivatedRoute} from '@angular/router';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-popover-edit',
  templateUrl: './popover-edit.component.html',
  styleUrls: ['./popover-edit.component.scss'],
})
export class PopoverEditComponent implements OnInit {
  constructor(public popoverController: PopoverController) {

  }
  @Input() data;

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  ngOnInit() {
    console.log(this.data);
  }

  close(dataReturned: string) {
    this.popoverController.dismiss(dataReturned);
  }

}
