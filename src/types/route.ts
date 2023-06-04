export interface Routes {
    list: Route[]
    suitabilityScore: number
}

export interface Route {
    driver: string
    destination: string
    suitabilityScore: number
}
