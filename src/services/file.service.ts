import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FileService {
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
            return false
        }

        return true
    }
}
