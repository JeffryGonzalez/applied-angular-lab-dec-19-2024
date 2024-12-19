import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RelativeTimeComponent } from '@shared';

@Component({
  selector: 'app-news-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RelativeTimeComponent],
  template: `
    <div>
      <h2>The News That's Fit To Print</h2>
      <p>
        Some Changes You loaded this
        <app-relative-time [date]="now()" suffix="ago" />
      </p>
    </div>
  `,
  styles: ``,
})
export class NewsHeaderComponent {
  now = signal(new Date().toISOString());
}
