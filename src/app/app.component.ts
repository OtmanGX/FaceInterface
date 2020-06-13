import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isSubMenu = false;
  public appName = 'FaceInterface';
  public company = 'MG ADVANCED TECHNOLOGY';
  public appPages = [
    {
      title: 'Tableau de bord',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'Mon compte',
    //   url: '/myaccount',
    //   icon: 'person-circle'
    // },
    {
      title: 'Personnes détectés',
      url: '/detected',
      icon: 'body'
    },
    // <ion-icon name="reorder-four"></ion-icon>
    {
      title: 'Liste des personnes',
      url: '/persons_list',
      icon: 'people-circle'
    },
    {
      title: 'Système',
      url: null,
      icon: 'settings',
      subpages: [
        {
          title: 'Entrainer',
          url: '/system/training',
          icon: 'construct',
        },
        {
          title: 'Configuration du système',
          url: 'system/config',
          icon: 'options',
        },
        {
          title: 'Configuration de la camera',
          url: 'system/camera-config',
          icon: 'videocam',
        },
      ]
    },
  {
      title: 'Se déconnecter',
      url: 'login',
      icon: 'key'
    },
  ];
  public labels = ['Family', 'Friends', 'Work'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.router.navigateByUrl('welcome');
      this.splashScreen.hide();
      // this.authService.refreshToken();
      this.authService.authenticateState.subscribe(state => {
        console.log('state is ' + state);
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }
}
