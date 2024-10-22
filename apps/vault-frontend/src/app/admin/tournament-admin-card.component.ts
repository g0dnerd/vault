import { Component, numberAttribute, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournament-admin-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tournament-admin-card.component.html',
  styleUrl: './tournament-admin-card.component.css',
})
export class TournamentAdminCardComponent {
  @Input({ required: true, transform: numberAttribute }) tournamentId = 0;
  @Input({ required: true }) tournamentName = '';
  @Input({ required: true, transform: numberAttribute }) tournamentCapacity = 0;
}
