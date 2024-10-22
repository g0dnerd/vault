import {
  Component,
  numberAttribute,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournament-detail-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tournament-detail-card.component.html',
  styleUrl: './tournament-detail-card.component.css',
})
export class TournamentDetailCardComponent {
  @Input({ required: true, transform: numberAttribute }) tournamentId = 0;
  @Input({ required: true }) tournamentName = '';
  @Input({ required: true, transform: numberAttribute }) tournamentCapacity = 0;
}
