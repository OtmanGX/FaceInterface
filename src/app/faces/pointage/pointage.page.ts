import {Component, OnInit, ViewChild} from '@angular/core';
import {DetectedService} from "../../services/detected.service";
import {AlertController, IonRefresher, ModalController, PopoverController, ToastController} from "@ionic/angular";
import {Observable} from "rxjs";
import {HttpParams} from "../../http_params";
import {PointageService} from "../../services/pointage.service";
import {MoveComponent} from "../detected/move/move.component";
import {FilterComponent} from './filter/filter.component';
import * as db from "../../../db";

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.page.html',
  styleUrls: ['./pointage.page.scss'],
})
export class PointagePage implements OnInit {

  @ViewChild(IonRefresher, {static: true}) refresher: IonRefresher;
  constructor(private service: PointageService,
              public modalController: ModalController,
              public popoverController: PopoverController,
              public toastController: ToastController,
              private alertController:AlertController) { }

  pointages: Array<any>;
  numberpages: number;
  pagesize = 30;
  params: HttpParams;

  ngOnInit() {
    this.params = new HttpParams();
    this.loadPointageList();
  }

  loadPointageList() {
    let pointages$ = this.service.getAllByPage(this.params.getParams());
    pointages$.subscribe(
        value => {
          this.numberpages = Math.round(value.count / this.pagesize);
          if (this.numberpages < value.count / this.pagesize) {
            this.numberpages++;
          }
          this.pointages = value.results;
        });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.params.set('page', 1)
      this.params.filterParams = [];
      this.loadPointageList();
      try {
        event.target.complete();
      } catch (e) {
        this.refresher.complete;
      }
    }, 2000);
  }

  OnPageChanged(pagenumber: number) {
    console.log(pagenumber);
    this.params.set('page', pagenumber);
    this.loadPointageList();
  }

  // Footer

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      cssClass: 'my-custom-class',
    });
    modal.onWillDismiss().then(value => {
      console.log('Modal result: ');
      console.log(value);
    });
    return await modal.present();
  }

  async presentTri() {
    const alert = await this.alertController.create({
      cssClass: 'tri-alert',
      header: 'Tri',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Date d\'entrée- Asc',
          value: 'date_entree',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Date d\'entrée- Desc',
          value: '-date_entree'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Nom de personne- Asc',
          value: 'person__name'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Nom de personne- Desc',
          value: '-person__name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (radioChecked) => {
            console.log(radioChecked);
            this.params.set('ordering', radioChecked);
            this.loadPointageList();
          }
        }
      ]
    });

    await alert.present();
  }

  search(word: string) {
    console.log(word);
    this.params.set('search', word);
    this.loadPointageList();
  }

  cancelSearch() {
    console.log('cancel search');
    this.params.delete('search');
    this.loadPointageList();
  }
}
