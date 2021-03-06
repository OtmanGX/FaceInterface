import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {

  constructor(private modal:ModalController) { }

  ngOnInit() {}

  submit(value: any) {
    console.log(value);
    this.dismiss(value);
  }

  dismiss(data?) {
    this.modal.dismiss(data);
  }
}
