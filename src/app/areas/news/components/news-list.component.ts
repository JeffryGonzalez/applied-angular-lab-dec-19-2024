import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { NewsArticle } from '../types';
import { NewsItemComponent } from './news-item/news-item.component';
import { ReadArticleStore } from '../services/read-articles.store';

@Component({
  selector: 'app-news-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NewsItemComponent],
  template: `
    <section>
      @if (articles.error()) {
        <p>BLAMMO!</p>
      }
      @if (articles.isLoading()) {
        <span class="loading loading-spinner text-primary"></span>
      } @else {
        @for (article of articles.value(); track article.id) {
          <!-- display the app-news-item -->
          <app-news-item
            (linkRead)="store.addArticle($event)"
            [articleToDisplay]="article"
          />
        } @empty {
          <p>No news! Check Back Later!</p>
        }
      }
    </section>
  `,
  styles: ``,
})
export class NewsListComponent {
  // data in a component is a Signal, or .................................. an observable
  preferredHeader = signal('This is a header from a signal');

  store = inject(ReadArticleStore);

  articles = resource<NewsArticle[], unknown>({
    loader: () =>
      fetch('http://fake-news.some-fake-server.com/news-feed').then((r) =>
        r.json(),
      ),
  });
}
