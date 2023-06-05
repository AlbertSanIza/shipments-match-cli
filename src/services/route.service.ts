import { Injectable } from '@nestjs/common'

import { Route, Routes } from '../types/route'

@Injectable()
export class RouteService {
    calculateRoutesV2(destinations: string[], drivers: string[]): Routes {
    }

    calculateRoutes(destinations: string[], drivers: string[]): Routes {
        // Calculate all the suitability scores for all the possible combinations of drivers and destinations
        const allPossibleRoutes: Route[] = []
        for (const destination of destinations) {
            for (const driver of drivers) {
                allPossibleRoutes.push({
                    driver: driver,
                    destination: destination,
                    suitabilityScore: this.calculateSuitabilityScore(destination, driver),
                })
            }
        }

        // Sort the results by Suitability Score in descending order
        allPossibleRoutes.sort((a, b) => b.suitabilityScore - a.suitabilityScore)

        // Dig recursively to take the best score, and filter out all items that contain the destination and name values of the best score
        // We will apply this recursively until we have no more items in the list
        const calculateBestRoutes = (routes: Route[]): Route[] => {
            // If we have no more items in the list, return the list
            if (routes.length === 0) {
                return routes
            }

            // Grab first value from list
            const bestRoute = routes[0]

            // Filter out all items that contain the values of the best score
            const remainingRoutes = routes.filter(
                (route) => route.driver !== bestRoute.driver && route.destination !== bestRoute.destination,
            )

            return [bestRoute, ...calculateBestRoutes(remainingRoutes)]
        }

        const bestRoutes = calculateBestRoutes(allPossibleRoutes)
        const totalSuitabilityScore = bestRoutes.reduce((acc, route) => acc + route.suitabilityScore, 0)

        return {
            list: bestRoutes,
            suitabilityScore: totalSuitabilityScore,
        }
    }

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
