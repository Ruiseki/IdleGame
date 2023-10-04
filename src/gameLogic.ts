export let point: Number = 0
export let mainCoef: Number = 0
export let clickCoef: Number = 1

export function mainClockStart()
{
    setInterval(() => {
        point += 1 * coef
    }, 1000)
}

export function mainClick()
{
    point += 1 * clickCoef
}