import { RouteService } from './route.service'

describe('RouteService', () => {
    let routeService: RouteService

    beforeEach(() => {
        routeService = new RouteService()
    })

    describe('calculateSuitabilityScore', () => {
        it('Should return 9 if given "44 Fake Dr., San Diego, CA 92122" as Destination and "Daniel Davidson" as Driver', () => {
            const inputDestination = '44 Fake Dr., San Diego, CA 92122'
            const inputDriver = 'Daniel Davidson'
            const expectedResult = 9

            const result = routeService.calculateSuitabilityScore(inputDestination, inputDriver)

            expect(result).toEqual(expectedResult)
        })
    })
})
