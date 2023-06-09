import { CommandFactory } from 'nest-commander'

import { StartModule } from './start.module'

async function bootstrap() {
    await CommandFactory.run(StartModule, ['warn', 'error'])
}

bootstrap()
