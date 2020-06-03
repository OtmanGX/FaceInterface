import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    credentialsform: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService

  ) { }

  ngOnInit() {
      this.credentialsform = this.formBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  onSubmit() {
      console.log(this.credentialsform.value);
      this.authService.login(this.credentialsform.value).subscribe();
  }


}
