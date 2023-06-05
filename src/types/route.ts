export interface Routes {
    list: Route[]
    suitabilityScore: number
}

export interface Route {
    destination: string
    driver: string
    suitabilityScore: number
}

export interface BacktrackList {
    row: number
    column: number
    value: number
}
