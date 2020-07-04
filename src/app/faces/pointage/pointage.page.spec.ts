import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PointagePage } from './pointage.page';

describe('PointagePage', () => {
  let component: PointagePage;
  let fixture: ComponentFixture<PointagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PointagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
