import { http, delay, HttpResponse } from 'msw';

const fakeLinks = [
  {
    id: '1',
    name: 'TypeScript Handbook',
    description: 'The TypeScript Language Handbook',
    link: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    datePosted: '2024-12-18',
    postedBy: 'Jeff',
  },
  {
    id: '2',
    name: 'Mozilla Developer Network',
    description: 'Good Documentation and Stuff',
    link: 'https://developer.mozilla.org/en-US/',
    datePosted: '2024-11-13',
    postedBy: 'Carla',
  },
  {
    id: '3',
    name: 'Hypertheory',
    description: 'Training ',
    link: 'https://www.hypertheory.com',
    datePosted: '2023-04-10',
    postedBy: 'Jeff',
  },
];

export const lrcHandlers = [
  http.post('/api/posts', async ({ request }) => {
    await delay(3000);
    const body = (await request.json()) as unknown as {
      name: string;
      description: string;
      link: string;
    };
    // const from = request.headers.get("Authorization") // blah blah blah
    const from = 'Jeff';
    const newPost = {
      ...body,
      id: crypto.randomUUID(),
      postedBy: from,
      datePosted: new Date().toISOString(),
    };
    return HttpResponse.json(newPost);
  }),
  http.get('/api/posts', async () => {
    await delay();
    return HttpResponse.json(fakeLinks);
  }),
];
