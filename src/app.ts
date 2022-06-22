// import 'reflect-metadata';

import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { expressLoader } from './configurations/expressLoader';
import { iocLoader } from './configurations/iocLoader';
import { monitorLoader } from './configurations/monitorLoader';
import { swaggerLoader } from './configurations/swaggerLoader';
import { typeormLoader } from './configurations/typeormLoader';
import { winstonLoader } from './configurations/winstonLoader';

const log = new Logger(__filename);

bootstrapMicroframework({
    loaders: [
        winstonLoader,
        iocLoader,
        typeormLoader,
        expressLoader,
        swaggerLoader,
        monitorLoader,
    ],
})
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error));
