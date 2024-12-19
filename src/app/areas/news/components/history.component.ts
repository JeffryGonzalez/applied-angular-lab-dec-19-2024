import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReadArticleStore } from '../services/read-articles.store';

@Component({
  selector: 'app-news-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (store.entities().length === 0) {
      <p>No Articles Read</p>
    } @else {
      <p>You Have Read The Following Articles</p>
      <ul>
        @for (article of store.entities(); track article.id) {
          <li>{{ article.title }}</li>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class HistoryComponent {
  store = inject(ReadArticleStore);
}
