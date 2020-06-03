import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-train',
  templateUrl: './modal-train.component.html',
  styleUrls: ['./modal-train.component.scss'],
})
export class ModalTrainComponent implements OnInit {

  inputlabel = 'Choisir les fichiers';
  images;
  constructor(private modal: ModalController) { }

  ngOnInit() {}

  dismiss(data= false) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    if (data && this.images) { data = this.images; }
    this.modal.dismiss({
      data
    });
  }

  changeImage(event) {
    this.images = event.target.files;
    this.inputlabel = this.getlabel(event.target);
  }

  getlabel(input) {
    // console.log()
    if ( input.files && input.files.length > 1 ) {
      return `${input.files.length} Fichiers`;
    }
    return input.value ? input.value : 'Choisir les fichiers';
  }
}
