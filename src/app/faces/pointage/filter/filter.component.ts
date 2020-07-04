import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  submit(value: any) {
    console.log(value);
    this.dismiss(value);
  }

  dismiss(data?) {
    this.modal.dismiss(data);
  }
}
