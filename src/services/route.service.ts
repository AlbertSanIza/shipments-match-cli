import { Injectable } from '@nestjs/common'

import { BacktrackList, Route, Routes } from '../types/route'

@Injectable()
export class RouteService {
    calculateRoutes(destinations: string[], drivers: string[]): Routes {
        // Calculate all the suitability scores for all the possible combinations of drivers and destinations
        const allPossibleRoutes: Route[] = []
        for (const destination of destinations) {
            for (const driver of drivers) {
                allPossibleRoutes.push({
                    destination: destination,
                    driver: driver,
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

    calculateRoutesV2(destinations: string[], drivers: string[]): Routes {
        // We are creating a matrix of suitability scores
        const suitabilityScoreMatrix: number[][] = []

        // If destinations length is greater than drivers length:
        // we will set drivers as the rows and destinations as the columns
        const isDestinationsLengthGreater = destinations.length > drivers.length
        const rows = isDestinationsLengthGreater ? drivers : destinations

        // If destinations length lower or equal than drivers length:
        // we will set destinations as the rows and drivers as the columns
        const columns = isDestinationsLengthGreater ? destinations : drivers

        // We will iterate through the rows and columns and calculate the suitability score for each combination
        for (let i = 0; i < rows.length; i++) {
            suitabilityScoreMatrix[i] = []
            for (let j = 0; j < columns.length; j++) {
                // IMPORTANT: To use calculateSuitabilityScore the first input must be the destination and the second input must be the driver
                // If destinations length is greater than drivers length
                //      rows = drivers and columns = destinations
                //      run calculateSuitabilityScore(column, row)
                // else
                //      rows = destinations and columns = drivers
                //      run calculateSuitabilityScore(row, column)
                suitabilityScoreMatrix[i][j] = isDestinationsLengthGreater
                    ? this.calculateSuitabilityScore(columns[j], rows[i])
                    : this.calculateSuitabilityScore(rows[i], columns[j])
            }
        }

        // We will use backtracking to find the best routes
        let highScore = 0
        let highScoreList: BacktrackList[] = []

        const backtrack = (list: BacktrackList[], rowIndex: number) => {
            // If we have reached the end of the matrix, calculate the suitability score for the list
            if (rowIndex === suitabilityScoreMatrix.length) {
                const currentScore = list.reduce((acc, item) => acc + item.value, 0)
                // If the current score is greater than the high score, replace the high score and the high score list
                if (currentScore > highScore) {
                    highScore = currentScore
                    highScoreList = list.slice()
                }
                return
            }

            // Iterate through each row of the matrix
            for (let columnIndex = 0; columnIndex < suitabilityScoreMatrix[rowIndex].length; columnIndex++) {
                // If the current list does not contain an element with the same row or column as the current index
                if (!list.some((element) => element.row === rowIndex || element.column === columnIndex)) {
                    // Add the current indexes to the list
                    list.push({ row: rowIndex, column: columnIndex, value: suitabilityScoreMatrix[rowIndex][columnIndex] })
                    // Call backtrack recursively with the updated list and the next row index
                    backtrack(list, rowIndex + 1)
                    // Remove the last element from the list
                    list.pop()
                }
            }
        }

        // Start the backtracking algorithm
        backtrack([], 0)

        // Populate the best routes list
        const bestRoutes = highScoreList
            .map((item) => {
                return {
                    // Same as before, if destinations length is greater than drivers length
                    //      rows = drivers and columns = destinations
                    //      run calculateSuitabilityScore(column, row)
                    // else
                    //      rows = destinations and columns = drivers
                    //      run calculateSuitabilityScore(row, column)
                    destination: isDestinationsLengthGreater ? columns[item.column] : rows[item.row],
                    driver: isDestinationsLengthGreater ? rows[item.row] : columns[item.column],
                    suitabilityScore: item.value,
                }
            })
            .sort((a, b) => b.suitabilityScore - a.suitabilityScore)

        return {
            list: bestRoutes,
            suitabilityScore: highScore,
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
