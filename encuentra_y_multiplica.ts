function sums2022(n1: number, n2: number): boolean {
    return n1 + n2 === 2022
}

function sumaMultiplica(nums: number[]): number | undefined {
    if(nums.length < 1)
        return undefined

    let result: number = -1
    let i: number, j: number

    for(i = 0; result === -1 && i < nums.length - 1; i++) {
        for(j = i+1; result === -1 && j < nums.length; j++) {
            if(sums2022(nums[i], nums[j])) {
                result = nums[i] * nums[j]
            }
        }
    }

    return result !== -1 ? result : undefined
}