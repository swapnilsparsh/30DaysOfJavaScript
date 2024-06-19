function generateMatrixInput() {
  const dimension = document.getElementById("dimension").value;
  const matrixInputDiv = document.getElementById("matrix-input");
  matrixInputDiv.innerHTML = ""; // Clear previous inputs

  for (let i = 0; i < dimension; i++) {
    const rowDiv = document.createElement("div");
    for (let j = 0; j < dimension; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = `matrix-${i}-${j}`;
      input.value = Math.floor(Math.random() * 10); // Default random values for fun
      rowDiv.appendChild(input);
    }
    matrixInputDiv.appendChild(rowDiv);
  }

  document.getElementById("calculate").style.display = "inline-block";
}

function calculateEigen() {
  const dimension = document.getElementById("dimension").value;
  const matrix = [];

  // Read matrix values from inputs
  for (let i = 0; i < dimension; i++) {
    const row = [];
    for (let j = 0; j < dimension; j++) {
      const value = parseFloat(
        document.getElementById(`matrix-${i}-${j}`).value
      );
      row.push(value);
    }
    matrix.push(row);
  }

  // Perform power iteration to find largest eigenvalue and eigenvector
  let eigenvalue = 0;
  let eigenvector = new Array(dimension).fill(1);
  const tolerance = 1e-6;
  const maxIterations = 1000;

  for (let iter = 0; iter < maxIterations; iter++) {
    let newEigenvector = multiplyMatrixVector(matrix, eigenvector);
    let norm = Math.max(...newEigenvector.map(Math.abs));
    newEigenvector = newEigenvector.map((val) => val / norm);

    if (Math.abs(norm - eigenvalue) < tolerance) {
      eigenvalue = norm;
      eigenvector = newEigenvector;
      break;
    }

    eigenvalue = norm;
    eigenvector = newEigenvector;
  }

  displayResults(eigenvalue, eigenvector);
}

function multiplyMatrixVector(matrix, vector) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 0; j < vector.length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return result;
}

function displayResults(eigenvalue, eigenvector) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p><strong>Largest Eigenvalue:</strong> ${eigenvalue.toFixed(6)}</p>`;
  resultsDiv.innerHTML += `<p class="value"><strong>Corresponding Eigenvector:</strong></br>[${eigenvector
    .map((val) => val.toFixed(6))
    .join(", ")}]</p>`;
}
