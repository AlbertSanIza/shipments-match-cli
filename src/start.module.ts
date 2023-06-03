import { Module } from '@nestjs/common'

import { FileService } from './services/file.service'
import { StartCommand } from './start.command'

@Module({
    providers: [StartCommand, FileService],
})
export class StartModule {}
