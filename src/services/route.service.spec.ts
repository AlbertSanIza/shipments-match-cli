import { RouteService } from './route.service'

describe('RouteService', () => {
    let routeService: RouteService

    beforeEach(() => {
        routeService = new RouteService()
    })

    // Rules
    // 1. If the length of the destination is even, the suitability score is the number of vowels in the driver multiplied by 1.5.
    // 2. If the length of the destination is odd, the suitability score is the number of consonants in the driver multiplied by 1.
    // 3. If the length of the destination shares any common factors (besides 1) with the length of the driver, the suitability score is multiplied by 1.5.

    describe('calculateSuitabilityScore', () => {
        it('Should return 9 if given "44 Fake Dr., San Diego, CA 92122" as Destination and "Daniel Davidson" as Driver', () => {
            // "44 Fake Dr., San Diego, CA 92122" has a length of 32: EVEN
            // "Daniel Davidson" has a length of 15, with 6 VOWELS and 8 CONSONANTS
            // Shared common factors: 1
            // Result: 6 * 1.5 * 1 = 9
            const inputDestination = '44 Fake Dr., San Diego, CA 92122'
            const inputDriver = 'Daniel Davidson'
            const expectedResult = 9

            const result = routeService.calculateSuitabilityScore(inputDestination, inputDriver)

            expect(result).toEqual(expectedResult)
        })

        it('Should return 8 if given "44 Fake Dr, San Diego, CA 92122" as Destination and "Daniel Davidson" as Driver', () => {
            // "44 Fake Dr, San Diego, CA 92122" has a length of 31: ODD
            // "Daniel Davidson" has a length of 15, with 6 VOWELS and 8 CONSONANTS
            // Shared common factors: 1
            // Result: 8 * 1 * 1 = 8

            const inputDestination = '44 Fake Dr, San Diego, CA 92122'
            const inputDriver = 'Daniel Davidson'
            const expectedResult = 8

            const result = routeService.calculateSuitabilityScore(inputDestination, inputDriver)

            expect(result).toEqual(expectedResult)
        })

        it('Should return 8 if given "44 Fake Dr." as Destination and "Daniel Davidson" as Driver', () => {
            // "44 Fake Dr." has a length of 11: ODD
            // "Daniel Davidson" has a length of 15, with 6 VOWELS and 8 CONSONANTS
            // Shared common factors: 1
            // Result: 8 * 1 * 1 = 8

            const inputDestination = '44 Fake Dr.'
            const inputDriver = 'Daniel Davidson'
            const expectedResult = 8

            const result = routeService.calculateSuitabilityScore(inputDestination, inputDriver)

            expect(result).toEqual(expectedResult)
        })

        it('Should return 13.5 if given "44 Fake Dr" as Destination and "Daniel Davidson" as Driver', () => {
            // "44 Fake Dr" has a length of 10: EVEN
            // "Daniel Davidson" has a length of 15, with 6 VOWELS and 8 CONSONANTS
            // Shared common factors: 1, 5
            // Result: 6 * 1.5 * 1.5 = 13.5

            const inputDestination = '44 Fake Dr'
            const inputDriver = 'Daniel Davidson'
            const expectedResult = 13.5

            const result = routeService.calculateSuitabilityScore(inputDestination, inputDriver)

            expect(result).toEqual(expectedResult)
        })
    })
})
