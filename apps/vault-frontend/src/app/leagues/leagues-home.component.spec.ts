import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaguesHomeComponent } from './leagues-home.component';

describe('LeaguesHomeComponent', () => {
  let component: LeaguesHomeComponent;
  let fixture: ComponentFixture<LeaguesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaguesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
