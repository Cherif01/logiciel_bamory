// Environnement de developpement

import { environment } from './environments/environment.prod';

const netLink: string = 'https://logiciel1.spa-dev.com/api/'; // ONLINE - LINK
const localLink: string = 'http://localhost:8888/api_bamory/api/'; // LOCAL - LINK

// Access Geant...
export const BASE_URL = environment.production ? netLink : localLink;
