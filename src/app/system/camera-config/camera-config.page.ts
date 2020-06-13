import {Component, OnInit, ViewChild} from '@angular/core';
import {SystemService} from '../../services/system.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-camera-config',
  templateUrl: './camera-config.page.html',
  styleUrls: ['./camera-config.page.scss'],
})
export class CameraConfigPage implements OnInit {
  advanced = false;
  config;
  @ViewChild('f', {static: false}) NgForm;
  constructor(private service: SystemService,
              public toastController: ToastController) { }

  ngOnInit() {
    this.getConfig();
  }
  async presentToast(msg, color= 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color
    });
    toast.present();
  }
  getConfig() {
    this.service.getConfig().subscribe(value => {
      this.config = value;
      this.config.resolution = this.config.resolution.join(",");
    }, error => console.log(error));


  }

  segmentChanged(event: CustomEvent) {
    if (event.detail.value === 'advanced') {
      this.advanced = true;
    } else {
      this.advanced = false;
    }
    console.log(event.detail.value);
  }

  submit(form) {
    form.resolution = form.resolution.split(',');
    console.log(form);
    this.service.setConfig(form).subscribe(value => {
      console.log(value);
      this.presentToast('Les paramètres sont enregistrés avec succès');
    }, error => {
      console.log(error);
      this.presentToast('Il y avait un erreur', 'danger');
    });
  }

}
