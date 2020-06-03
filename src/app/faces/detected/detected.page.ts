import { Component, OnInit } from '@angular/core';
import {DetectedService} from '../../services/detected.service';
import {AlertController, ModalController, PopoverController, ToastController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {HttpParams} from '../../http_params';
import {PopoverEditComponent} from '../../components/popover-edit/popover-edit.component';
import * as db from '../../../db';
import {ModalTrainComponent} from '../../persons/modal-train/modal-train.component';
import {MoveComponent} from './move/move.component';

@Component({
  selector: 'app-detected',
  templateUrl: './detected.page.html',
  styleUrls: ['./detected.page.scss'],
})
export class DetectedPage implements OnInit {

  constructor(private service: DetectedService,
              public modalController: ModalController,
              public popoverController: PopoverController,
              public toastController: ToastController) { }

  faces$: Observable<any>;
  faces: Array<object>;
  numberpages: number;
  pagesize = 18;
  params: HttpParams;
  selectedElements: any[] = [];

  ngOnInit() {
    this.params = new HttpParams();
    this.loadDetectedFaces();

  }

  loadDetectedFaces() {
    this.faces$ = this.service.getAllByPage(this.params.getParams());
    this.faces$.subscribe(
        value => {
          this.numberpages = Math.round(value.count / this.pagesize);
          if (this.numberpages < value.count / this.pagesize) {
              this.numberpages++;
          }
          this.faces = value.results;
        });
 }

  OnPageChanged(pagenumber: number) {
    console.log(pagenumber);
    this.params.set('page', pagenumber);
    this.loadDetectedFaces();
  }

    async presentToast(msg, color= 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color
        });
        toast.present();
    }

    async presentModal(id) {
        const modal = await this.modalController.create({
            component: MoveComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                id
            }
        });
        modal.onWillDismiss().then(value => {
            switch (value.data) {
                case 'Success':
                    this.presentToast(db.SUCCESS_MSG);
                    this.selectedElements = [];
                    this.loadDetectedFaces();
                    break;
                case 'Error':
                    this.presentToast(db.ERROR_MSG, 'danger');
                    break;
            }
            console.log('Modal result: ');
            console.log(value);
        });
        return await modal.present();
    }
    async presentPopover(ev: any, i: number) {
        const popover = await this.popoverController.create({
            component: PopoverEditComponent,
            event: ev,
            translucent: true,
            componentProps: {data: {move: 'Déplacer', delete: 'Supprimer', cancel: 'Annuler'}}
        });
        popover.onDidDismiss().then(value => {
            console.log(value);
            switch (value.data) {
                case 'delete':
                    this.deleteItem(i);
                    break;
                case 'move':
                    return;
            }
        });
        return await popover.present();
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
        this.selectedElements.forEach(id => {
            this.deleteItem(id);
        });
    }
    deleteItem(id: number) {
        this.service.delete(id).subscribe(() => {
            this.presentToast(db.SUCCESS_MSG);
            this.params.set('page', 1);
            this.loadDetectedFaces();
        }, error => this.presentToast(db.ERROR_MSG, 'warning'));
    }
}
