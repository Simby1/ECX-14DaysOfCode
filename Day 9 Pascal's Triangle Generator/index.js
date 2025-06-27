
function generatePascalsTriangle(numRows) {
  // to handle invalid or zero input for numRows.
  if (numRows <= 0) {
    return [];
  }

  // initializing the triangle with the first row: [1]
  const triangle = [[1]]; 

  // iterating from the second row up to the desired number of rows. The loop starts at i = 1 because the first row (index 0) is already initialized.
  for (let i = 1; i < numRows; i++) {
    // declaring and getting the previous row to calculate the current row.
    const prevRow = triangle[i - 1];
    // initializing the current row.
    const currentRow = [];

    // pushing the first element of currentRow in the triangle, which is always 1.
    currentRow.push(1);

    // To get the middle elements of the current row. Further explained in README.md
    for (let j = 0; j < prevRow.length - 1; j++) {
      currentRow.push(prevRow[j] + prevRow[j + 1]);
    }

    // pushing the last element of currentRow in the triangle, which is always 1.
    currentRow.push(1);

    //push current row to the triangle
    triangle.push(currentRow);
  }

  return triangle;
}


console.log("Pascal's Triangle for 5 rows:", generatePascalsTriangle(5));
// output: [[1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]
