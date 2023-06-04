import { Injectable } from '@nestjs/common'

@Injectable()
export class RouteService {
    calculateSuitabilityScore(destination: string, driver: string): number {
        let suitabilityScore = 0

        // If either destination or driver is empty, return 0
        if (!destination || !driver) {
            return suitabilityScore
        }
        return suitabilityScore
    }
}
