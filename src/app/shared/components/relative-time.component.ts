import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-relative-time',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<span>{{ relativeDate() }}</span> `,
  styles: ``,
})
export class RelativeTimeComponent {
  relativeDate = signal('');
  date = input.required<string>();

  suffix = input('Ago');
  constructor() {
    effect(() => {
      // something in the background.
      // effects are "side effects" - not like "special effects"
      const intervalId = setInterval(() => {
        this.relativeDate.set(
          formatDistanceToNow(new Date(this.date())) + ' ' + this.suffix(),
        );
      }, 1000);
      return () => {
        clearInterval(intervalId);
      }; // optional - code to run when the component is taken out of the dom.
    });
  }
}
