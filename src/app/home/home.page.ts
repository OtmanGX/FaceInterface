import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {SystemService} from "../services/system.service";
import {DashboardService} from "../services/dashboard.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  resultInfo$;
  state$;
  constructor(private toastController: ToastController,
              private systemService:SystemService,
              private dashService:DashboardService,
              ) { }

  ngOnInit() {
    this.state$ = this.systemService.getState();
    this.resultInfo$ = this.dashService.getDashboardInfo();
  }



}
