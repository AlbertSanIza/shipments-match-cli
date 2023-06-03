import { Injectable } from '@nestjs/common'

@Injectable()
export class RouteService {
    calculateSuitabilityScore(destination: string, driver: string): number {
        console.log('🚀 ~', destination)
        console.log('🚀 ~', driver)
        return 0
    }
}
