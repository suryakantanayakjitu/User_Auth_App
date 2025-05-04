import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateForgotPasswordLinkComponent } from './generate-forgot-password-link.component';

describe('GenerateForgotPasswordLinkComponent', () => {
  let component: GenerateForgotPasswordLinkComponent;
  let fixture: ComponentFixture<GenerateForgotPasswordLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateForgotPasswordLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateForgotPasswordLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
