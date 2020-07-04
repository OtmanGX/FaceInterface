import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./auth/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'myaccount',
    loadChildren: () => import('./account/myaccount/myaccount.module').then( m => m.MyaccountPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'order',
    loadChildren: () => import('./account/order/order.module').then( m => m.OrderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    loadChildren: () => import('./auth/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'persons_list',
    loadChildren: () => import('./persons/persons_list/persons.module').then(m => m.PersonsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-person',
    loadChildren: () => import('./persons/add-person/add-person.module').then( m => m.AddPersonPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'detected',
    loadChildren: () => import('./faces/detected/detected.module').then( m => m.DetectedPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'system/training',
    loadChildren: () => import('./system/training/training.module').then( m => m.TrainingPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'person-detail',
    loadChildren: () => import('./persons/person-detail/person-detail.module').then( m => m.PersonDetailPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'system/config',
    loadChildren: () => import('./system/configuration/configuration.module').then( m => m.ConfigurationPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'system/camera-config',
    loadChildren: () => import('./system/camera-config/camera-config.module').then( m => m.CameraConfigPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pointage',
    loadChildren: () => import('./faces/pointage/pointage.module').then( m => m.PointagePageModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
