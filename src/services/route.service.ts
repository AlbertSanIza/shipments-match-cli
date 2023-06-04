import { Injectable } from '@nestjs/common'

@Injectable()
export class RouteService {
    calculateSuitabilityScore(destination: string, driver: string): number {
        let suitabilityScore = 0

        // If either destination or driver is empty, return 0
        if (!destination || !driver) {
            return suitabilityScore
        }

        // If length of destination is even
        if (destination.length % 2 === 0) {
            // SS is equal to the number of vowels in the driver's name multiplied by 1.5
            const vowelsCount = driver.match(/[aeiou]/gi).length
            suitabilityScore = vowelsCount * 1.5
        }
        // If length of destination is odd
        else {
            // SS is equal to the number of consonants in the driver's name
            // First we remove all non alphabetic characters
            const consonantsCount = driver.replace(/[^a-zA-Z]/g, '').match(/[^aeiou]/gi).length
            suitabilityScore = consonantsCount
        }
        return suitabilityScore
    }
}
