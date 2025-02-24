import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueDetailCardComponent } from './league-detail-card.component';

describe('LeagueDetailCardComponent', () => {
  let component: LeagueDetailCardComponent;
  let fixture: ComponentFixture<LeagueDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
