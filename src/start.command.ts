import { Command, CommandRunner, Option } from 'nest-commander'

import { FileService } from './services/file.service'
import { RouteService } from './services/route.service'

interface StartCommandOptions {
    write_file?: boolean
    version_two?: boolean
}

// This is the command that will be executed by nest-commander
// It can be executed by running: ts-node src/main.ts <destinations_file_path> <drivers_file_path>
@Command({
    name: 'start',
    arguments: '<destinations_file_path> <drivers_file_path>',
    description: 'Calculate the Suitability Score for a list of Destinations and Drivers',
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
        const bestRoutes = options.version_two
            ? this.routeService.calculateRoutesV2(destinationsList, driversList)
            : this.routeService.calculateRoutes(destinationsList, driversList)

        // Print as table
        console.table(bestRoutes.list)
        console.log(`Total Suitability Score: ${bestRoutes.suitabilityScore}`)

        // Save the results in a file if -w or --write_file flag is passed to commander
        if (options.write_file) {
            this.fileService.writeFile(bestRoutes)
        }
    }

    @Option({
        flags: '-w, --write_file',
        description: 'Writes a result.csv file inside example_files folder',
    })
    runWithWriteFile(): boolean {
        return true
    }

    @Option({
        flags: '-v2, --version_two',
        description: 'Use the version 2 of the algorithm (slower but more accurate)',
    })
    runWithV2Algorithm(): boolean {
        return true
    }
}
