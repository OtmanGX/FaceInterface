import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {PersonsService} from '../../services/persons.service';
import {Observable} from 'rxjs';
import {
  ActionSheetController,
  AlertController,
  IonButtons,
  IonSearchbar, ModalController,
  PopoverController,
  ToastController
} from '@ionic/angular';
import {PopoverComponent} from '../../components/popover/popover.component';
import {PopoverEditComponent} from '../../components/popover-edit/popover-edit.component';
import * as db from '../../../db';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { IonRefresher } from '@ionic/angular';
import { HttpParams } from '../../http_params';
import {MoveComponent} from "../../faces/detected/move/move.component";
import {ModalFilterComponent} from "./modal-filter/modal-filter.component";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.page.html',
  styleUrls: ['./persons.page.scss'],
})
export class PersonsPage implements OnInit {

  @ViewChild(IonRefresher, {static: true}) refresher: IonRefresher;

  constructor(private service: PersonsService,
              public popoverController: PopoverController,
              public toastController: ToastController,
              public alertController: AlertController,
              public modalController: ModalController,
              public actionSheetController: ActionSheetController,
              private route: ActivatedRoute,
              private  router: Router) {}

  persons$: Observable<object[]>;
  params: HttpParams;
  clicked = false;

  ngOnInit() {
    this.params = new HttpParams();
    this.loadPersons();
    this.route.paramMap.subscribe(params => {
      if (params.has('result')) {
        this.presentToast(db.SUCCESS_MSG);
      }
    });
  }

  loadPersons() {
    this.persons$ = this.service.getAll(this.params.getParams());
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
          //
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

  async presentPopover(ev: any, i: number, person?: string) {
    const popover = await this.popoverController.create({
      component: PopoverEditComponent,
      event: ev,
      translucent: true,
      componentProps: {data: {edit: 'Modifier', delete: 'Supprimer', cancel: 'Annuler'}}
    });
    popover.onDidDismiss().then(value => {
      console.log(value);
      switch (value.data) {
        case 'delete':
          this.deletePerson(i);
          break;
        case 'edit':
          this.openDetail(i, person);
      }
    });
    return await popover.present();
  }

  deletePerson(id:number) {
    this.service.delete(id).subscribe(() => {
      this.presentToast(db.SUCCESS_MSG);
      this.loadPersons();
    }, error => this.presentToast(db.ERROR_MSG, 'warning'));
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadPersons();
      try {
        event.target.complete();
      } catch (e) {
        this.refresher.complete();
      }

    }, 2000);
  }

  search(word) {
    // const searchWord = event.target.value;
    console.log(word);
    this.params.set('search', word);
    this.loadPersons();
  }

  cancelSearch() {
    console.log('cancel search');
    this.params.delete('search');
    this.loadPersons();
  }


  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'tri-alert',
      header: 'Tri',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Date de création - ascendant',
          value: 'created_at',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Date de création - descendant',
          value: '-created_at'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Nom - ascendant',
          value: 'name'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Nom - descendant',
          value: '-name'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Age - ascendant',
          value: 'age'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Age - descendant',
          value: '-age'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Date de mise à jour - ascendant',
          value: 'last_updated'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Date de mise à jour - descendant',
          value: '-last_updated'
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
            this.loadPersons();
          }
        }
      ]
    });

    await alert.present();
  }


  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: ModalFilterComponent,
      cssClass: 'my-custom-class',
    });
    modal.onWillDismiss().then(value => {
      console.log(value);
      this.params.filterParams = [];
      if (value.data) {


        // this.loadPersons();
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

  openDetail(id: number, person: string) {
    this.router.navigate(['person-detail', {id, person}]);
}

  async presentActionSheet(person) {
    const actionSheet = await this.actionSheetController.create({
      header: person.name,
      cssClass: 'my-action-sheet',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deletePerson(person.id);
        }
      }, {
        text: 'Modifier',
        icon: 'create',
        handler: () => {
          this.service.currentPerson = person;
          this.router.navigate(['add-person', {edit: true}]);
        }
      }, {
        text: 'Dataset',
        icon: 'images',
        handler: () => {
          this.openDetail(person.id, person.name);
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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
          }
        }
      ]
    });

    await alert.present();
  }

  async presentOtherOptions(ev: any) {
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

}
