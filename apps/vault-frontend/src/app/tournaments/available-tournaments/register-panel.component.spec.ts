import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPanelComponent } from './register-panel.component';

describe('InfoPanelComponent', () => {
  let component: RegisterPanelComponent;
  let fixture: ComponentFixture<RegisterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
