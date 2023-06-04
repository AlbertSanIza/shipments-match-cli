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

        // If the destination's length and the driver's length share a common factor besides 1, multiply the suitability score by 1.5
        // We use the shortest string as the limit for the loop to find the common factor
        const shortestString = Math.min(destination.length, driver.length)
        for (let i = 2; i <= shortestString; i++) {
            if (destination.length % i === 0 && driver.length % i === 0) {
                // If we find a common factor, we multiply the suitability score by 1.5 and break the loop
                suitabilityScore *= 1.5
                break
            }
        }

        return suitabilityScore
    }
}
