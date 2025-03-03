import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMatchPanelComponent } from './admin-match-panel.component';

describe('AdminMatchPanelComponent', () => {
  let component: AdminMatchPanelComponent;
  let fixture: ComponentFixture<AdminMatchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMatchPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMatchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
