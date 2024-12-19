import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GolfStore } from '../services/golf-store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <span
        >Current Score:{{ store.currentScore() }} for hole
        {{ store.hole() }}</span
      ><button (click)="store.takeAStroke()" class="btn btn-circle btn-success">
        +
      </button>
      <button
        [disabled]="store.sunkDisabled()"
        (click)="store.sunk()"
        class="btn btn-circle btn-accent"
      >
        S
      </button>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(GolfStore);
}
