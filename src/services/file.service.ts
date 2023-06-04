import { Injectable, Logger } from '@nestjs/common'
import { stringify } from 'csv-stringify'
import * as fs from 'fs'
import * as path from 'path'

import { Route } from '../types/route'

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name)

    readFile(filePath: string): string[] {
        if (!this.fileExists(filePath)) {
            return []
        }

        // Read the file and split into lines
        let fileContent = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
        // Remove any empty lines and trim edges
        fileContent = fileContent.map((line) => line.trim()).filter((line) => line.length > 0)
        // Some lines might contain multiple spaces, we want to replace them with a single space
        fileContent = fileContent.map((line) => line.replace(/\s\s+/g, ' '))
        // Some lines might have trailing commas, we want to remove them
        fileContent = fileContent.map((line) => line.replace(/^,+/g, '').replace(/,+$/g, ''))
        // Some lines might not have a space after a comma, we want to add it
        fileContent = fileContent.map((line) => line.replace(/,(?!\s)/g, ', '))

        return fileContent
    }

    writeFile(content: Route[]): void {
        const filename = './result.csv'
        const writableStream = fs.createWriteStream(filename)
        const stringifier = stringify({ header: true, columns: ['Driver', 'Destination', 'Suitability Score'] })
        for (const line of content) {
            stringifier.write({
                Driver: line.driver,
                Destination: line.destination,
                'Suitability Score': line.suitabilityScore,
            })
        }
        stringifier.pipe(writableStream)
    }

    private fileExists(filePath: string): boolean {
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
