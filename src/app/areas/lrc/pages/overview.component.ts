import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ListComponent } from '../components/list.component';
import { EntryComponent } from '../components/entry.component';

@Component({
  selector: 'app-lrc-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListComponent, EntryComponent],
  template: ` <div class="flex gap-4">
    <div class="w-1/2">
      <app-lrc-list />
    </div>
    <div class="w-1/2">
      <app-lrc-entry />
    </div>
  </div>`,
  styles: ``,
})
export class OverviewComponent {}
