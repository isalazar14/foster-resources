import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClothingPage } from './clothing.page';

describe('ClothingPage', () => {
  let component: ClothingPage;
  let fixture: ComponentFixture<ClothingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClothingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
