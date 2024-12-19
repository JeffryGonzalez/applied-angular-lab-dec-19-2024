import { Routes } from '@angular/router';
import { HistoryComponent } from './components/history.component';
import { UiComponent } from './components/ui.component';
import { GolfComponent } from './golf.component';
import { GolfStore } from './services/golf-store';
export const GOLF_ROUTES: Routes = [
  {
    path: '',
    component: GolfComponent,
    providers: [GolfStore],
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
    ],
  },
];
