import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { UiComponent } from './pages/ui.component';
import { PrefsComponent } from './pages/prefs.component';
import { CounterStore } from './services/counter-store';
import { Prefs2Component } from './pages/prefs2.component';
import { canMatchFeature } from '@shared';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    providers: [CounterStore],
    component: CounterComponent,
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
      {
        path: 'prefs',
        canMatch: [canMatchFeature('ryan-prefs')],
        component: Prefs2Component,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
    ],
  },
];
