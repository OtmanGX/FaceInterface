import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTrainComponent } from './modal-train.component';

describe('ModalTrainComponent', () => {
  let component: ModalTrainComponent;
  let fixture: ComponentFixture<ModalTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTrainComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
