import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';

import { Storage, IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Jwt
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
// Services
import {PersonsService} from './services/persons.service';

// Locale
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

export function jwtOptions(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    domainName : ['localhost:8000'],
    whitelistedDomains: ['localhost:8000']
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptions,
        deps: [Storage]
      }, config: {
        skipWhenExpired: true
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PersonsService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
