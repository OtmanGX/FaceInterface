import {Component, OnInit, ViewChild} from '@angular/core';
import {DetectedService} from '../../services/detected.service';
import {AlertController, IonRefresher, ModalController, PopoverController, ToastController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {HttpParams} from '../../http_params';
import {PopoverEditComponent} from '../../components/popover-edit/popover-edit.component';
import * as db from '../../../db';
import {ModalTrainComponent} from '../../persons/modal-train/modal-train.component';
import {MoveComponent} from './move/move.component';
import {FilterComponent} from './filter/filter.component';

@Component({
  selector: 'app-detected',
  templateUrl: './detected.page.html',
  styleUrls: ['./detected.page.scss'],
})
export class DetectedPage implements OnInit {

  @ViewChild(IonRefresher, {static: true}) refresher: IonRefresher;
  constructor(private service: DetectedService,
              public modalController: ModalController,
              public popoverController: PopoverController,
              public toastController: ToastController,
              private alertController:AlertController) { }

  faces$: Observable<any>;
  faces: Array<any>;
  numberpages: number;
  pagesize = 30;
  params: HttpParams;
  grid = true;
  selectedElements: any[] = [];


  ngOnInit() {
    this.params = new HttpParams();
    this.loadDetectedFaces();

  }

  loadDetectedFaces() {
    this.faces$ = this.service.getAllByPage(this.params.getParams());
    this.selectedElements = []
    this.faces$.subscribe(
        value => {
          this.numberpages = Math.round(value.count / this.pagesize);
          if (this.numberpages < value.count / this.pagesize) {
              this.numberpages++;
          }
          this.faces = value.results;
        });
 }

    doRefresh(event) {
        console.log('Begin async operation');
        setTimeout(() => {
            console.log('Async operation has ended');
            this.params.set('page', 1)
            this.params.filterParams = [];
            this.loadDetectedFaces();
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

    async presentTri() {
        const alert = await this.alertController.create({
            cssClass: 'tri-alert',
            header: 'Tri',
            inputs: [
                {
                    name: 'radio1',
                    type: 'radio',
                    label: 'Date de création- Asc',
                    value: 'created_at',
                    checked: true
                },
                {
                    name: 'radio2',
                    type: 'radio',
                    label: 'Date de création- Desc',
                    value: '-created_at'
                },
                {
                    name: 'radio3',
                    type: 'radio',
                    label: 'Nom de personne- Asc',
                    value: 'label__name'
                },
                {
                    name: 'radio3',
                    type: 'radio',
                    label: 'Nom de personne- Desc',
                    value: '-label__name'
                },
                {
                    name: 'radio3',
                    type: 'radio',
                    label: 'Precision- Asc',
                    value: 'precision'
                },
                {
                    name: 'radio3',
                    type: 'radio',
                    label: 'Precision- Desc',
                    value: '-precision'
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
                        this.loadDetectedFaces();
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentFilterModal() {
        const modal = await this.modalController.create({
            component: FilterComponent,
            cssClass: 'my-custom-class',
        });
        modal.onWillDismiss().then(value => {
            console.log(value);
            this.params.filterParams = [];
            if (value.data) {
                switch (value.data.identity) {
                    case 'known':
                        this.params.filterParams.push(["label__unknown",0]);
                        break;
                    case 'unknown':
                        this.params.filterParams.push(["label__unknown",1]);
                        console.log("unknown");
                        break;
                }
                if (value.data.statein)
                    this.params.filterParams.push(["instate",1]);
                if (value.data.stateout)
                    this.params.filterParams.push(["instate",0]);
                if (value.data.precision_gt8)
                    this.params.filterParams.push(["precision__gt",0.8]);
                else if (value.data.precision_gt7)
                    this.params.filterParams.push(["precision__gt",0.7]);
                else if (value.data.precision_gt8)
                    this.params.filterParams.push(["precision__lt6",0.6]);

                this.loadDetectedFaces();
            }
            // switch (value.data) {
            //     case 'Success':
            //         break;
            //     case 'Error':
            //         break;
            // }
        });
        return await modal.present();
    }

    async presentPopover(ev: any, i: number) {
      this.selectedElements = [];
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
                    this.deleteItem(i, true);
                    // this.params.set('page', 1);
                    // this.loadDetectedFaces();
                    break;
                case 'move':
                    return;
            }
        });
        return await popover.present();
    }

    async presentOtherOptions(ev: any) {
        this.selectedElements = [];
        const popover = await this.popoverController.create({
            component: PopoverEditComponent,
            event: ev,
            translucent: true,
            componentProps: {data: {delete: 'Supprimer tout '}}
        });
        popover.onDidDismiss().then(value => {
            console.log(value);
            switch (value.data) {
                case 'delete':
                    console.log("delete all");
                    this.presentAlertConfirm();
                    break;
            }
        });
        return await popover.present();
    }

    async presentModeView(ev: any) {
        this.selectedElements = [];
        const popover = await this.popoverController.create({
            component: PopoverEditComponent,
            event: ev,
            translucent: true,
            componentProps: {data: {grid: 'Grid View', list: 'List View'}}
        });
        popover.onDidDismiss().then(value => {
            console.log(value);
            switch (value.data) {
                case 'grid':
                    console.log("grid");
                    this.grid = true;
                    break;
                case 'list':
                    console.log("list");
                    this.grid = false;
                    break;
            }
        });
        return await popover.present();
    }

    selectCard(event: Event, id) {
        const index = this.selectedElements.indexOf(id, 0);
        if (index > -1) {
            this.selectedElements.splice(index, 1);
        } else {
          this.selectedElements.push(id);
        }
    }

    footerStyle() {
        if (this.selectedElements.length === 0) {
            return {display: 'none'};
        }
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Danger!',
            message: 'Etes-vous <strong>sûr</strong>!!!',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Supprimer',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.deleteAll();
                    }
                }
            ]
        });

        await alert.present();
    }

    deleteSelected() {
        this.selectedElements.forEach((item, id) => {
            this.deleteItem(item, id == (this.selectedElements.length-1));
        });
    }

    deleteAll() {
      this.service.deleteAll().subscribe(value => {
          console.log(value);
          this.selectedElements = []
          this.presentToast(db.SUCCESS_MSG);
          this.params.set('page', 1);
          this.loadDetectedFaces();
      }, error => {
          console.log(error);
          this.presentToast(db.ERROR_MSG, 'warning');
      })
    }
    deleteItem(id: number, last?:boolean) {
        this.service.delete(id).subscribe(() => {
            this.presentToast(db.SUCCESS_MSG);
            this.selectCard(null, id);
            if (last==true) {
                this.params.set('page', 1);
                this.loadDetectedFaces();
            }
        }, error => this.presentToast(db.ERROR_MSG, 'warning'));
    }

    selectAll() {
        this.selectedElements = this.faces.map(x=>x.id);
    }

    search(word: string) {
        console.log(word);
        this.params.set('search', word);
        this.loadDetectedFaces();
    }

    cancelSearch() {
        console.log('cancel search');
        this.params.delete('search');
        this.loadDetectedFaces();
    }
}
