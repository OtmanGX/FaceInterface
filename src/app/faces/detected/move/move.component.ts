import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PersonsService} from '../../../services/persons.service';
import {Observable} from 'rxjs';
import {FormGroup, FormGroupDirective} from '@angular/forms';
import {DatasetService} from '../../../services/dataset.service';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss'],
})

export class MoveComponent implements OnInit {

  @Input() id;
  persons$: Observable<any>;
  constructor(private modal: ModalController,
              private personService: PersonsService,
              private datasetService: DatasetService) { }

  ngOnInit() {
    this.persons$ = this.personService.getAll();
  }
  dismiss() {
    this.modal.dismiss({
    });
  }

  move(form) {
    // form.id_person = this.id;
    console.log(form);
    this.datasetService.move(form).subscribe( value => {
      console.log(value);
      this.modal.dismiss('Success');
    }, error => {
      console.log(error);
      this.modal.dismiss('Error');
    });
  }
}
