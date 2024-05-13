export function randomStringSuffix(expectedString: String) {
    return `${expectedString}${Math.floor((Math.random() * 1000000000) + 1000000)}`;
}

/**
 * Get the time difference in seconds
 */
export function timeDifference (string: string, start:number, end:number) {
    const elapsed = (end - start) / 1000;
    console.log(`${string} It took ${elapsed} seconds.`);
}
