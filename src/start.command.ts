import { Command, CommandRunner, Option } from 'nest-commander'

import { FileService } from './services/file.service'
import { RouteService } from './services/route.service'

interface StartCommandOptions {
    write_file?: boolean
}

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

    async run(parameters: string[], options?: StartCommandOptions): Promise<void> {
        // Grab input parameters
        const [destinationsFilePath, driversFilePath] = parameters

        // Read files
        const destinationsList = this.fileService.readFile(destinationsFilePath)
        const driversList = this.fileService.readFile(driversFilePath)
        // If the files are empty finish execution
        if (!(destinationsList.length > 0 && driversList.length > 0)) {
            return
        }

        // Calculate the best combination of drivers and destinations
        // A driver can only be assigned to one destination
        // A destination can only be assigned to one driver
        const routes = this.routeService.calculateRoutesV1(destinationsList, driversList)

        // Print as table
        console.table(routes)
        // Calculate the total suitability score
        const totalSuitabilityScore = routes.reduce((acc, route) => acc + route.suitabilityScore, 0)
        // Print the total suitability score
        console.log(`Total Suitability Score: ${totalSuitabilityScore}`)

        // Save the results in a file if -w or --write_file flag is passed to commander
        if (options.write_file) {
            this.fileService.writeFile(routes)
        }
    }

    @Option({
        flags: '-w, --write_file',
        description: 'Writes a result.csv file inside example_files folder',
    })
    runWithWriteFile(): boolean {
        return true
    }
}
