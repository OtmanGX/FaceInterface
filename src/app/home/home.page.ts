import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {SystemService} from "../services/system.service";
import {DashboardService} from "../services/dashboard.service";
import { Chart } from 'chart.js';
import {PersonsService} from "../services/persons.service";
import {DetectedService} from "../services/detected.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barChart', {static: true}) barChart;

  resultInfo$;
  state$;
  persons$;
  availablePersons$;
  faces$;
  faces: any;
  bars: any;
  colorArray: any;
  constructor(private toastController: ToastController,
              private alertController:AlertController,
              private systemService:SystemService,
              private dashService:DashboardService,
              private personService:PersonsService,
              private detectedService:DetectedService,
              ) { }

  ngOnInit() {
    this.state$ = this.systemService.getState();
    this.resultInfo$ = this.dashService.getDashboardInfo();
    // this.createBarChart();
    this.persons$ = this.personService.getAll({ordering:'-created_at'});
    this.availablePersons$ = this.personService.availablePersons();
    this.faces$ = this.detectedService.getAllByPage({});
    // this.faces$.subscribe(
    //     value => {
    //       this.faces = value.results;
    //     });
  }

  // Charts

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ['OTM11', 'AHM25', 'AIS12', 'SAB45', 'OUS55'],
        datasets: [{
          label: 'Nombre d\'heures',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
