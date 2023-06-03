# Shipments Match CLI

## About This

This is a coding exercise requested by Platform Science and submitted by [Albert Sanchez](https://www.linkedin.com/in/albertsaniza)

## Problem

I have to provide a CLI tool capable of pairing drivers and destinations. The catch is that we can only route one shipment to one driver per day.

The mathematical model for determining which drivers are best suited to deliver each shipment is the following:

-   If the `length` of the shipment's destination street name is `even`, the base suitability score is the `number of vowels` in the driver’s name `multiplied by 1.5`
-   If the `length` of the shipment's destination street name is `odd`, the base suitability score is the `number of consonants` in the driver’s name `multiplied by 1`
-   If the `length` of the shipment's destination street name `shares any common factors` (besides 1) with the length of the driver’s name, the base suitability score is `increased by 50%`

## Example

If provided a driver file with `Daniel Davidson` on one line and an address file with `44 Fake Dr., San Diego, CA 92122` on a line, that pairing’s suitability score would be `9`

## Solution

I will try to solve `44 Fake Dr., San Diego, CA 92122` in a few different ways that came to my mind because the example does not specify how much of the destination string we are actually using, or if special characters are being considered. Here are my possible inputs:

| Input | Destination                        |
| ----- | ---------------------------------- |
| A     | `44 Fake Dr., San Diego, CA 92122` |
| B     | `44 Fake Dr.`                      |
| C     | `44 Fake Dr, San Diego, CA 92122`  |
| D     | `44 Fake Dr`                       |

First I will check how many vowels and consonants the driver names has:

| Driver            | Length | Vowels   | Consonants |
| ----------------- | ------ | -------- | ---------- |
| `Daniel Davidson` | 15     | `aieaio` | `DnlDvdsn` |
| Total             |        | 6        | 8          |

Now I will check common factors (besides 1) for each input:

| Input | Destination Length | Driver Length | Common Factors | Multiply By |
| ----- | ------------------ | ------------- | -------------- | ----------- |
| A     | 32                 | 15            |                | 1           |
| B     | 11                 | 15            |                | 1           |
| C     | 31                 | 15            |                | 1           |
| D     | 10                 | 15            | 5              | 1.5 (50%)   |

Now I will start calculations for each Input in the same order as the model explains:

| Input | Destination                        | Length | EVEN or ODD | BSS | Multiply (EVEN or ODD) | First Result | Multiply (Common Factor) | Final Result |
| ----- | ---------------------------------- | ------ | ----------- | --- | ---------------------- | ------------ | ------------------------ | ------------ |
| `A`   | `44 Fake Dr., San Diego, CA 92122` | `32`   | `EVEN`      | `6` | `1.5`                  | `9`          | `1`                      | `9`          |
| B     | 44 Fake Dr.                        | 11     | ODD         | 8   | 1                      | 8            | 1                        | 8            |
| C     | 44 Fake Dr, San Diego, CA 92122    | 31     | ODD         | 8   | 1                      | 8            | 1                        | 8            |
| D     | 44 Fake Dr`                        | 10     | EVEN        | 6   | 1.5                    | 9            | 1.5                      | 13.5         |

So `Input A` turned out to be the way to go.

## Ignored Posible Assumptions

There are some assumptions that I might be ignoring (but I will ask about them on interview).

-   Is the EVEN/ODD BSS considered base before or after multiplying against vowels/constants length
-   Which brings me to... Is the third bullet applied to BSS before multiplying the EVEN/ODD condition?

## CLI Requirements

-   [NodeJS](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/getting-started/install)

## Installation

```bash
$ git clone https://github.com/AlbertSanIza/shipments-match-cli.git
$ cd shipments-match-cli
$ yarn install
```

## Usage

TBD...
