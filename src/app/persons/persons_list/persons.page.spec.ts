import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonsPage } from './persons.page';

describe('PersonsPage', () => {
  let component: PersonsPage;
  let fixture: ComponentFixture<PersonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
