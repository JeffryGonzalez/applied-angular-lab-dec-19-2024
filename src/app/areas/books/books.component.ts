import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Books Here</p> `,
  styles: ``,
})
export class BooksComponent {}
