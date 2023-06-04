import { Module } from '@nestjs/common'

import { FileService } from './services/file.service'
import { RouteService } from './services/route.service'
import { StartCommand } from './start.command'

@Module({
    providers: [StartCommand, FileService, RouteService],
})
export class StartModule {}
