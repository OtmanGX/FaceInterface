import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {SystemService} from '../../services/system.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {

  loading;
  trainInfo$: Observable<any>;
  result;
  constructor(private service: SystemService,
              public loadingController: LoadingController) { }


  ngOnInit() {
    this.trainInfo$ = this.service.getTrainInfo();
    this.service.getTrainInfo().subscribe(value => console.log(value));
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

  startTraining() {
    this.presentLoading();
    this.service.train().subscribe(value => {
      this.result = value;
      this.loading.dismiss();
    }, error => console.log(error));
  }
}
