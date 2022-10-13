import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialSupportPage } from './social-support.page';

describe('SocialSupportPage', () => {
  let component: SocialSupportPage;
  let fixture: ComponentFixture<SocialSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSupportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
