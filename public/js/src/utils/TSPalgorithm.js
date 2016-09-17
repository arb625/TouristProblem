import _ from 'underscore';

// The TSP Dynamic Programming Problem and Algorithm
//
// Problem: starting at home, visit all cities (events) once
// before returning home in the shortest way possible (given
// cities, start, and pairwise distances between cities)
//
// Pseudocode:
//
// C({1}, 1) = 0
// for s = 2 to n:
// 	for all subsets S of {1,2,...,n} of size s and containing 1:
// 		C(S,1) = infinity
// 		for all j in S, j != 1:
// 			C(S,j) = min(C(S-{j}, j) + d_ij: i in S, i != j)
// return min_j C({1,...,n}, j) + d_j1
//
// **C(S,j) = length of shortest path visiting each node in S exactly once,
// starting at 1 and ending at j
//
// Runtime: O(n^2*2^n)
//
// See Algorithms by Dasgupta, Papadimitriou, Vazirani for more information

export default function TSPalgorithm (events, startingEvent, distances) {
	n = events.length
	C = [for (i in _.range(Math.pow(2,n))) [for (j in _.range(n)) 0]]
	C[cityListToString([1])][0] = 0
	for (var s = 2; s <= n; s++) {
		_.each(_.filter(subsets(_.range(1,n+1),s), (S) => _.contains(subset, 1)), (S) => {
			C[cityListToString(S)][0] = Number.MAX_SAFE_INTEGER
			_.each(S, (j) => {
				if (j != 1) {
					C[cityListToString(S)][j-1] = Number.MAX_SAFE_INTEGER
					_.each(S, (i) => {
						if (i != j) {
							C[cityListToString(S)][j-1] = Math.min(C[cityListToString(S)][j-1], C[cityListToString(_.without(S, j))][j-1] + distances[i-1][j-1])
						}
					}) 
				}
			})
		})
	}
	return _.min(_.map(_.range(1,n+1), (j) => C[cityListToString(_.range(1,n+1))][j] + distances[j-1][0]))
}

function cityListToString(cityList) {
	return String(cityList)
}

function cityStringToList(cityString) {
	return _.map(cityString.split(","), (city) => parseInt(city))
}

function subsets(a, size) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    fn(size, a, [], all);
    return all;
}
