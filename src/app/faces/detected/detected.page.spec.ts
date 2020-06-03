import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetectedPage } from './detected.page';

describe('DetectedPage', () => {
  let component: DetectedPage;
  let fixture: ComponentFixture<DetectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
