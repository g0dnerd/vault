import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDraftListComponent } from './admin-draft-list.component';

describe('AdminDraftListComponent', () => {
  let component: AdminDraftListComponent;
  let fixture: ComponentFixture<AdminDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDraftListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
