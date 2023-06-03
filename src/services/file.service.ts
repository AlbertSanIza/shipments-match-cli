import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name)

    fileExists(filePath: string): boolean {
        try {
            // Replace any \ with /
            // TODO: I need to confirm if this work in unix
            const sanitizedFilePath = filePath.replace(/\\/g, '/')
            // Resolve the path to the file
            const resolvedPath = path.resolve(sanitizedFilePath)
            // Check if the file exists, if it doesn't, an error will be thrown
            const fileStats = fs.statSync(resolvedPath)
            // Check if the file is a file and not a directory
            if (!fileStats.isFile() || fileStats.isDirectory()) {
                throw new Error()
            }
        } catch (error) {
            this.logger.error(`"${filePath}" is not a valid file`)
            return false
        }

        return true
    }
}
