import { Command, CommandRunner } from 'nest-commander'

import { FileService } from './services/file.service'
import { RouteService } from './services/route.service'

@Command({
    name: 'start',
    arguments: '<destinations_file_path> <drivers_file_path>',
    description: 'Calculate Suitability Score for a list of Destinations and Drivers',
    options: { isDefault: true },
})
export class StartCommand extends CommandRunner {
    constructor(private readonly fileService: FileService, private readonly routeService: RouteService) {
        super()
    }

    async run(parameters: string[]): Promise<void> {
        // Grab input parameters
        const [destinationsFilePath, driversFilePath] = parameters

        // Read files
        const destinationsList = this.fileService.readFile(destinationsFilePath)
        const driversList = this.fileService.readFile(driversFilePath)
        // If the files are empty finish execution
        if (!(destinationsList.length > 0 && driversList.length > 0)) {
            return
        }

        for (const destination of destinationsList) {
            for (const driver of driversList) {
                this.routeService.calculateSuitabilityScore(destination, driver)
            }
        }

        // Calculate all the suitability scores
        // Find the combination for maximum total suitability score
    }
}