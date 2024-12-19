import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <select class="select">
    @for (by of store.byValues(); track by) {
      <option [value]="by">{{ by }}</option>
    }
  </select>`,
  styles: ``,
})
export class Prefs2Component {
  store = inject(CounterStore);
}
