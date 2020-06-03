import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraConfigPage } from './camera-config.page';

describe('CameraConfigPage', () => {
  let component: CameraConfigPage;
  let fixture: ComponentFixture<CameraConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraConfigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
