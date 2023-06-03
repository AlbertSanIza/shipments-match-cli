import { Command, CommandRunner } from 'nest-commander'

@Command({
    name: 'start',
    arguments: '<destinations_file_path> <drivers_file_path>',
    description: 'Calculate Suitability Score for a list of Destinations and Drivers',
    options: { isDefault: true },
})
export class StartCommand extends CommandRunner {
    async run(parameters: string[]): Promise<void> {
        console.log('🚀 ~ StartCommand ~ run ~ parameters:', parameters)
        // Read files
        // Calculate all the suitability scores
        // Find the combination for maximum total suitability score
    }
}
