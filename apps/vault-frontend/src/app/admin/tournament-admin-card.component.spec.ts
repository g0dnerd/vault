import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentAdminCardComponent } from './tournament-admin-card.component';

describe('TournamentAdminCardComponent', () => {
  let component: TournamentAdminCardComponent;
  let fixture: ComponentFixture<TournamentAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentAdminCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
