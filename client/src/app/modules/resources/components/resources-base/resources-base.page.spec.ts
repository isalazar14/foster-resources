import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResourcesBasePage } from './resources-base.page';

describe('ResourcesHomePage', () => {
  let component: ResourcesBasePage;
  let fixture: ComponentFixture<ResourcesBasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesBasePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
