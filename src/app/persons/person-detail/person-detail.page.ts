import { Component, OnInit } from '@angular/core';
import {ModalController, PopoverController, ToastController} from '@ionic/angular';
import {ModalTrainComponent} from '../modal-train/modal-train.component';
import {DatasetService} from '../../services/dataset.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpParams} from '../../http_params';
import {PopoverEditComponent} from '../../components/popover-edit/popover-edit.component';
import * as db from '../../../db';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {

  faces$: Observable<any[]>;
  train; dataset; test;
  trainSelected = true;
  params = new HttpParams();
  id;
  constructor(public modalController: ModalController,
              public service: DatasetService,
              public activatedRoute: ActivatedRoute,
              public popoverController: PopoverController,
              public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.id) {
      this.id = '48';
    }
    this.params.set('label', this.id);
    this.load_faces();
  }

  async presentPopover(ev: any, i: number, dataset: string) {
    const popover = await this.popoverController.create({
      component: PopoverEditComponent,
      event: ev,
      translucent: true,
      componentProps: {data: {
        move: dataset === 'Train' ? 'déplacer vers Teste' : 'déplacer vers Entrainement',
          delete: 'Supprimer',
          cancel: 'Annuler'}}
    });
    popover.onDidDismiss().then(value => {
      console.log(value);
      switch (value.data) {
        case 'delete':
          this.service.delete(i).subscribe(() => {
            this.presentToast(db.SUCCESS_MSG);
            this.load_faces();
          }, error => this.presentToast(db.ERROR_MSG, 'warning'));
          break;
        case 'move':
          const data = {dataset_type: this.dataset === this.test ? 'Train' : 'Test'};
          this.service.patch(i, data).subscribe(() => {
            console.log('Success');
            this.load_faces();
              },
              error => console.log('Error'));
      }
    });
    return await popover.present();
  }

  async presentToast(msg, color= 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color
    });
    toast.present();
  }

  load_faces() {
    console.log('Load faces');
    this.service.getAll(this.params.getParams()).subscribe(value => {
      this.train = value.filter(element => element.dataset_type === 'Train');
      this.test = value.filter(element => element.dataset_type === 'Test');
      if (this.trainSelected) {
        this.dataset = this.train;
      } else { this.dataset = this.test; }
    });
  }

  async presentModal(dataset= 'Train') {
    const modal = await this.modalController.create({
      component: ModalTrainComponent,
      cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(value => {
      console.log(value);
      if (value.data.data) {
        this.upload(value.data.data, dataset);
      }
    });
    return await modal.present();
  }

  segmentChanged(event: CustomEvent) {
      console.log(event.detail.value);
      if (event.detail.value === 'Train') {
        this.dataset = this.train;
        this.trainSelected = true;
      } else {
        this.dataset = this.test;
        this.trainSelected = false;
      }
      // this.params.set('dataset_type', event.detail.value)
  }

  addTrain(dataset) {
    this.presentModal(dataset);
  }

  upload(images, dataset= 'Train') {
    for (const image of images) {
      const formData = new FormData();
      formData.append('label', this.id);
      formData.append('dataset_type', dataset);
      formData.append('image', image, image.name);
      this.service.create(formData).subscribe(() => {
        console.log('Success');
        this.load_faces();
      }, error => console.log('Error'));
    }
  }
}
