import { Component, Input, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-pool',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-pool.component.html',
  styleUrl: './manage-pool.component.css',
})
export class ManagePoolComponent {
  @Input({ required: true, transform: numberAttribute }) draftId = 0;
  @Input({ required: true, transform: numberAttribute }) playerId = 0;
}
