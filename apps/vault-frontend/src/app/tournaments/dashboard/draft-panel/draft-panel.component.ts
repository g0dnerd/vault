import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';

import { MatchPanelComponent, MyPoolComponent } from '..';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [MatchPanelComponent, MyPoolComponent, NgIf, PushPipe],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.css',
})
export class DraftPanelComponent {}
