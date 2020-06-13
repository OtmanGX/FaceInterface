import { Component, OnInit } from '@angular/core';
import {PersonsService} from '../../services/persons.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NavParams} from "@ionic/angular";
import {Person, emptyPerson} from '../../../db'

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.page.html',
  styleUrls: ['./add-person.page.scss'],
})
export class AddPersonPage implements OnInit {

  toggleState = true;
  labels: Set<string>;
  avatar;
  person:Person;
  edit = false;

  constructor(private service: PersonsService,
              private route: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.labels = new Set<string>();
    this.person = emptyPerson;
    if (this.activatedRoute.snapshot.paramMap.has('edit')) {
      this.edit = true;
      this.person = this.service.currentPerson;
      this.labels = new Set<string>(this.person.labels.map(x=> x.name));
    }
  }

  labelsKeyUp(event: any) {
    const lastCharacter: string = event.value.substr(-1);
    if (lastCharacter === ',') {
        this.labels.add(event.value.substr(0, event.value.length - 1));
        event.value = '';
    }
  }

  removeLabel(item: string) {
    this.labels.delete(item);
  }

  submit(form: any) {
    if (!form.age) {
      form.age = '';
    }
    const formData: FormData = this.toFormData(form);
    let i = 0;
    this.labels.forEach(value => {
      console.log(value);
      formData.append(`labels[${i}]name`, value);
      i++;
    });
    if (this.avatar) {
      formData.append('avatar', this.avatar, this.avatar.name);
    }
    // console.log(formData.get('labels[0]name'));
    // formData.set('labels[0]','');
    // formData.set(
    //     'labels', JSON.stringify(form.labels));

    // form.avatar = this.avatar;
    if (this.edit) {
      console.log(form);
      console.log(this.person);
      this.service.update(this.person.id, formData).subscribe(() => {
        console.log('Success update');
        this.route.navigate(['persons_list', {result: 'success'}]);
          }, error => console.log(error));
    }
    else {
    this.service.create(formData).subscribe(() => {
      console.log('Success submit');
      this.route.navigate(['persons_list', {result: 'success'}]);
    }, error => console.log(error));
  }
  }

  toFormData(form) {
    const formData = new FormData();
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
      formData.append(key, form[key]);
    }
    }
    return formData;
  }

  changeImage(event) {
    this.avatar = event.target.files[0];
    console.log(this.avatar);
  }
}
