import { http, HttpResponse } from 'msw';
const enabledDevelopmentFeatures = ['lrc', '  '];
export const features = [
  http.get('api/features', () => {
    return HttpResponse.json(enabledDevelopmentFeatures);
  }),
];
