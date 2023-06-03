import { Command, CommandRunner } from 'nest-commander'

@Command({
    name: 'start',
    options: { isDefault: true },
})
export class StartCommand extends CommandRunner {
    async run(parameters: string[]): Promise<void> {
        console.log('🚀 ~ StartCommand ~ run ~ parameters:', parameters)
    }
}
