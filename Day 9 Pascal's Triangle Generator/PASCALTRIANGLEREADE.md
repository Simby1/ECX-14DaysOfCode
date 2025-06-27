# Pascal's Triangle Generator

This document explains my logic and approach to creating Pascal's Triangle up to a specified number of rows.

## Aim

To create a function, `generatePascalsTriangle()`, that accepts a non-negative integer `numRows` and returns Pascal's Triangle as an array of arrays, representing each row and containing the number of rows specified in `numRows`.

### Example Input/Output:

- **Input:** 3 - `numRows`
- **Output:** `[[1], [1,1], [1,2,1]]`

## Approach and Logic

The function `generatePascalsTriangle` builds the triangle iteratively, row by row, leveraging the fundamental properties of Pascal's Triangle.

### 1. Handling Edge Cases / Base Case

- **Zero or Negative Rows:** If `numRows` is 0 or less, Pascal's Triangle cannot be formed. The function immediately returns an empty array `[]`.

```javascript
if (numRows <= 0) {
  return [];
}
```

### 2. Initializing the Triangle

```javascript
const triangle = [[1]];
```

Pascal's Triangle always begins with a single 1 at the top (often considered the "0th" or "1st" row). This line helps initialize the triangle array with this crucial first row. It also serves as the base case from which subsequent rows will be built. Without this initial `[1]`, the logic for building subsequent rows would fail, as there would be no "previous row" to reference as per my logic.

### 3. Iteratively Building Subsequent Rows

```javascript
for (let i = 1; i < numRows; i++) {
  // logic for building each row ...
}
```

This is the outer loop responsible for creating each new row, starting from the second row (index 1 `[1]` - after the initial 0th row initialised) up to the desired `numRows`. The loop variable `i` represents the index of the row we are currently building. Since the row at index 0 has already been initialised, `i` has been set to 1 (index 1 `[1]` - second row).

#### Inside the Outer Loop - Building a Single `currentRow`:

**Getting the Previous Row:**

```javascript
const prevRow = triangle[i - 1];
```

- **Purpose:** To build a new row, we must know the numbers in the row directly above it in the triangle's visual structure. This `prevRow` variable holds a reference to that completed row.
- **Logic:** If `i` is the index of the `currentRow` we are creating, then `i - 1` is the index of the previous row that has already been calculated and stored in `triangle`.

**Example:** If `numRows` is 3:

- When `i` is 1 (building Row 1, which is `[1,1]`), `prevRow` will be `triangle[0]` (which is `[1]`).
- When `i` is 2 (building Row 2, which is `[1,2,1]`), `prevRow` will be `triangle[1]` (which is `[1,1]`).

**Initializing the Current Row:**

```javascript
const currentRow = [];
```

An empty array is initialized. This will be the "container" where we place the numbers for the new row we are currently constructing.

**Adding the First 1 (Left Edge):**

```javascript
currentRow.push(1);
```

- **Purpose:** To place the left-most number of the new row.
- **Logic:** A fundamental property of Pascal's Triangle is that every row always starts with a 1. This line adds that initial 1 to the `currentRow`.

**Calculating Middle Elements (The Inner Loop):**

```javascript
for (let j = 0; j < prevRow.length - 1; j++) {
  currentRow.push(prevRow[j] + prevRow[j + 1]);
}
```

This is the inner loop where the core calculation of Pascal's Triangle happens for the "middle" numbers.

- **Rule:** Each number inside a row is the sum of the two numbers directly above it in the `prevRow`.
- **`j` loop variable:** `j` is an index that moves along the `prevRow`, picking pairs of adjacent numbers.
- **Operation:** `prevRow[j] + prevRow[j + 1]`: This operation selects two adjacent numbers from `prevRow` (e.g., `prevRow[0]` and `prevRow[1]`, then `prevRow[1]` and `prevRow[2]`, etc.) and adds them together. The result is pushed into `currentRow`.

**Loop Condition/Limit:**

- **Condition:** `j < prevRow.length - 1`

This condition is crucial. It ensures that `j` does not go out of bounds when trying to access `prevRow[j + 1]`. The loop stops one element before the end of `prevRow`. This is because the last element of `prevRow` (`prevRow[prevRow.length - 1]`) cannot be the start of a pair (`prevRow[last] + prevRow[last+1]`) as there's no element after it. This correctly processes all possible adjacent pairs within `prevRow`.

**Adding the Last 1 (Right Edge):**

```javascript
currentRow.push(1);
```

- **Purpose:** To place the right-most number of the new row.
- **Logic:** Similar to the start, every row always ends with a 1. This line adds the final 1 to complete the `currentRow`.

**Adding the Completed Row to the Triangle:**

```javascript
triangle.push(currentRow);
```

After the `currentRow` is fully constructed (with its starting 1, all middle sums, and ending 1), it is added to the main triangle array. This makes it available as `prevRow` for the next iteration of the outer loop.
