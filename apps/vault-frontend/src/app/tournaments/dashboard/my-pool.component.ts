import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.css',
})
export class MyPoolComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) id = 0;

  checkinStatus$: Observable<boolean> = of(false);
  checkoutStatus$: Observable<boolean> = of(false);

  ngOnInit() {
    console.log('roo');
  }
}
