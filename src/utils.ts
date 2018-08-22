/**
 * Creates an array in the form of [startInclusive, startInclusive+1, …, endNonInclusive-1].
 * @param startInclusive lower bound (always lower than or equal to endNonInclusive).
 * @param endNonInclusive upper bound.
 */
export function arrayWithRange(startInclusive: number, endNonInclusive: number) {
	const result = new Array(endNonInclusive - startInclusive);
	for (let i = startInclusive; i < endNonInclusive; i += 1) {
		result[i - startInclusive] = i;
	}
	return result;
}
