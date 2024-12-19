import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GolfStore } from '../services/golf-store';

@Component({
  selector: 'app-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Your Current Score is {{ store.totalForGame() }}</p>
    <ul>
      @for (hole of store.entities(); track hole.id) {
        <li>On hole {{ hole.id }} you scored {{ hole.score }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class HistoryComponent {
  store = inject(GolfStore);
}
