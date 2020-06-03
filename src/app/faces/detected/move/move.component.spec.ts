import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoveComponent } from './move.component';

describe('MoveComponent', () => {
  let component: MoveComponent;
  let fixture: ComponentFixture<MoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
