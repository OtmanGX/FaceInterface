import {Component, Input, OnInit} from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  PopoverController,
  ToastController
} from '@ionic/angular';
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
  person;
  loading;
  selectedElements: any[] = [];
  constructor(public modalController: ModalController,
              public service: DatasetService,
              public activatedRoute: ActivatedRoute,
              public popoverController: PopoverController,
              public loadingController: LoadingController,
              public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.person = this.activatedRoute.snapshot.paramMap.get('person');
    if (!this.id) {
      this.id = '48';
    }
    this.params.set('label', this.id);
    this.load_faces();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Attendez svp...',
      duration: 12000
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  getDataset() {
    return this.trainSelected ? 'déplacer vers Teste' : 'déplacer vers Entrainement';
  }

  async presentPopover(ev: any, i: number) {
    const popover = await this.popoverController.create({
      component: PopoverEditComponent,
      event: ev,
      translucent: true,
      componentProps: {data: {
        move: this.getDataset(),
          delete: 'Supprimer',
          cancel: 'Annuler'}}
    });
    popover.onDidDismiss().then(value => {
      console.log(value);
      switch (value.data) {
        case 'delete':
          this.deleteItem(i);
          break;
        case 'move':
          this.move(i);
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
    let i = 0;
    for (const image of images) {
      const formData = new FormData();
      formData.append('label', this.id);
      formData.append('dataset_type', dataset);
      formData.append('image', image, image.name);
      this.service.create(formData).subscribe(() => {
        console.log('Success');
        i++;
        if (images.length == i) {
          this.load_faces();
        }
      }, error => {
        console.log('Error');
        i++;
      });
    }
  }

  selectCard($event: Event, id) {
    const index = this.selectedElements.indexOf(id, 0);
    if (index > -1) {
      this.selectedElements.splice(index, 1);
    } else {
      this.selectedElements.push(id);
    }
    console.log('card selected');
  }

  footerStyle() {
    if (this.selectedElements.length === 0) {
      return {display: 'none'};
    }
  }

  deleteSelected() {
    this.presentLoading();
    let index = 0;
    this.selectedElements.forEach(id => {
      this.service.delete(id).subscribe(() => {
        index++;
        console.log(id);
        console.log(this.selectedElements[this.selectedElements.length-1]);
        if (id === this.selectedElements[this.selectedElements.length-1]){
          this.presentToast(db.SUCCESS_MSG);
          this.selectedElements = [];
          this.loading.dismiss();
          this.load_faces();
        }

      }, error => {
        this.presentToast(db.ERROR_MSG, 'warning');
        this.selectedElements = [];
      });

    });

  }

  move(i) {
    const data = {dataset_type: this.trainSelected ? 'Test' : 'Train'};
    if (typeof i === 'number') {
      this.service.patch(i, data).subscribe(() => {
            console.log('Success');
            this.load_faces();
          },
          error => console.log('Error'));
    } else {
      this.presentLoading();
      let index=0;
      i.forEach(id => {
        this.service.patch(id, data).subscribe(() => {
          index++;
          if (index == i.length()) {
            this.presentToast(db.SUCCESS_MSG);
            this.selectedElements = [];
            this.load_faces();
            this.loading.dismiss();
          }
            },
            error => {
          console.log('Error');
              this.selectedElements = [];
            });
      });
    }
    }

  private deleteItem(id: number) {
    this.service.delete(id).subscribe(() => {
      this.presentToast(db.SUCCESS_MSG);
      this.load_faces();
    }, error => this.presentToast(db.ERROR_MSG, 'warning'));
  }
}
