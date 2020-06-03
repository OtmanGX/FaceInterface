import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {PersonsService} from '../../services/persons.service';
import {Observable} from 'rxjs';
import {AlertController, IonButtons, IonSearchbar, PopoverController, ToastController} from '@ionic/angular';
import {PopoverComponent} from '../../components/popover/popover.component';
import {PopoverEditComponent} from '../../components/popover-edit/popover-edit.component';
import * as db from '../../../db';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { IonRefresher } from '@ionic/angular';
import { HttpParams } from '../../http_params';

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
              private route: ActivatedRoute,
              private  router: Router) { }

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

  async presentPopover(ev: any, i: number) {
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
          this.service.delete(i).subscribe(() => {
            this.presentToast(db.SUCCESS_MSG);
            this.loadPersons();
          }, error => this.presentToast(db.ERROR_MSG, 'warning'));
          break;
        case 'edit':
          this.openDetail(i);
      }
    });
    return await popover.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadPersons();
      event.target.complete();
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

  async presentAlertCheckBox() {
    const alert = await this.alertController.create({
      header: 'Filtre',
      inputs: [
        {
          name: 'check1',
          type: 'checkbox',
          label: 'activé',
          value: ['active', 'True']
        },
        {
          name: 'check2',
          type: 'checkbox',
          label: 'Non activé',
          value: ['active', 'True']
        },
        {
          name: 'number1',
          type: 'text',
          label: 'Age >',
        },
        {
          name: 'number2',
          type: 'number',
          label: 'Age <',
        },
        {
          name: 'number3',
          type: 'number',
          label: 'Age = ',
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
          handler: (data) => {
            console.log(data);
            // this.params.filterParams = data;
            // this.loadPersons();
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();

  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
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

  openDetail(id: number) {
    this.router.navigate(['person-detail', {id}]);
}

}
