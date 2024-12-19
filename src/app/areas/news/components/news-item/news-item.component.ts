import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { NewsArticle } from '../../types';
import { RelativeTimeComponent } from '@shared';

@Component({
  selector: 'app-news-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RelativeTimeComponent],
  template: `
    @let article = articleToDisplay();

    <article class="card bg-base-100 shadow-xl mb-4">
      <div class="card-body">
        <h2 [title]="article.datePublished" class="card-title text-primary">
          {{ article.title }}
        </h2>
        <p>{{ article.shortDescription }}</p>
        <p>
          <small
            >This article was posted
            <app-relative-time [date]="article.datePublished"
          /></small>
        </p>
        <div class="card-actions justify-end">
          <a
            (click)="linkRead.emit(article)"
            class="btn btn-primary"
            [href]="article.link"
            target="_blank"
            >{{ article.linkSlug }}</a
          >
        </div>
      </div>
    </article>
  `,
  styles: ``,
})
export class NewsItemComponent {
  articleToDisplay = input.required<NewsArticle>();

  // @Output() linkRead = new EventEmitter<NewsArticle>()
  linkRead = output<NewsArticle>();

  // effects - these are Signal things that you can use to do cool stuff, but be careful
}
