// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx';
import * as $_app from './routes/_app.tsx';
import * as $api_images from './routes/api/images.ts';
import * as $api_joke from './routes/api/joke.ts';
import * as $greet_name_ from './routes/greet/[name].tsx';
import * as $home from './routes/home.tsx';
import * as $index from './routes/index.tsx';
import * as $AccessSystem from './islands/AccessSystem.tsx';
import * as $Counter from './islands/Counter.tsx';
import * as $HomeNavigation from './islands/HomeNavigation.tsx';
import * as $ImageGallery from './islands/ImageGallery.tsx';
import * as $NewsGatherer from './islands/NewsGatherer.tsx';
import * as $NewsReader from './islands/NewsReader.tsx';
import * as $WelcomeIsland from './islands/WelcomeIsland.tsx';
import { type Manifest } from '$fresh/server.ts';

const manifest = {
  routes: {
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/api/images.ts': $api_images,
    './routes/api/joke.ts': $api_joke,
    './routes/greet/[name].tsx': $greet_name_,
    './routes/home.tsx': $home,
    './routes/index.tsx': $index,
  },
  islands: {
    './islands/AccessSystem.tsx': $AccessSystem,
    './islands/Counter.tsx': $Counter,
    './islands/HomeNavigation.tsx': $HomeNavigation,
    './islands/ImageGallery.tsx': $ImageGallery,
    './islands/NewsGatherer.tsx': $NewsGatherer,
    './islands/NewsReader.tsx': $NewsReader,
    './islands/WelcomeIsland.tsx': $WelcomeIsland,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
