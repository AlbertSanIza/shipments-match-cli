import { Command, CommandRunner } from 'nest-commander'

import { FileService } from './services/file.service'

@Command({
    name: 'start',
    arguments: '<destinations_file_path> <drivers_file_path>',
    description: 'Calculate Suitability Score for a list of Destinations and Drivers',
    options: { isDefault: true },
})
export class StartCommand extends CommandRunner {
    constructor(private readonly fileService: FileService) {
        super()
    }

    async run(parameters: string[]): Promise<void> {
        // Grab input parameters
        const [destinationsFilePath, driversFilePath] = parameters

        console.log(this.fileService.fileExists(destinationsFilePath))
        console.log(this.fileService.fileExists(driversFilePath))
        // Read files
        // Calculate all the suitability scores
        // Find the combination for maximum total suitability score
    }
}
