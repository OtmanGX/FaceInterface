import { Component, OnInit } from '@angular/core';
import {PersonsService} from '../../services/persons.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.page.html',
  styleUrls: ['./add-person.page.scss'],
})
export class AddPersonPage implements OnInit {

  toggleState = true;
  labels: Set<string>;
  avatar;

  constructor(private service: PersonsService,
              private route: Router) { }

  ngOnInit() {
    this.labels = new Set<string>();
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
    // console.log(form);
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

    this.service.create(formData).subscribe(() => {
      console.log('Success submit');
      this.route.navigate(['persons_list', {result: 'success'}]);
    }, error => console.log(error));
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
