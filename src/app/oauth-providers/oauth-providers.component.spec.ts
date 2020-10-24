import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthProvidersComponent } from './oauth-providers.component';

describe('OauthProvidersComponent', () => {
  let component: OauthProvidersComponent;
  let fixture: ComponentFixture<OauthProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
