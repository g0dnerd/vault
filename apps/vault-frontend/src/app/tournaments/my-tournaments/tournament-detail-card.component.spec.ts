import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentDetailCardComponent } from './tournament-detail-card.component';

describe('TournamentDetailCardComponent', () => {
  let component: TournamentDetailCardComponent;
  let fixture: ComponentFixture<TournamentDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
