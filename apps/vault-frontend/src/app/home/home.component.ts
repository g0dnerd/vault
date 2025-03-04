import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthAppState } from '../_store';
import { initProfile } from '../_store/actions/auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  ngOnInit() {
    this.authStore$.dispatch(initProfile());
  }
}
