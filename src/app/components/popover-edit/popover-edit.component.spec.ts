import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverEditComponent } from './popover-edit.component';

describe('PopoverEditComponent', () => {
  let component: PopoverEditComponent;
  let fixture: ComponentFixture<PopoverEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
