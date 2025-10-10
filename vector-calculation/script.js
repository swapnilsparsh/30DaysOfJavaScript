function getVectors() {
    const ax = parseFloat(document.getElementById('ax').value) || 0;
    const ay = parseFloat(document.getElementById('ay').value) || 0;
    const az = parseFloat(document.getElementById('az').value) || 0;
    const bx = parseFloat(document.getElementById('bx').value) || 0;
    const by = parseFloat(document.getElementById('by').value) || 0;
    const bz = parseFloat(document.getElementById('bz').value) || 0;

    return { A: [ax, ay, az], B: [bx, by, bz] };
}

function calculateMagnitude() {
    const { A, B } = getVectors();
    const magA = Math.sqrt(A[0]**2 + A[1]**2 + A[2]**2).toFixed(3);
    const magB = Math.sqrt(B[0]**2 + B[1]**2 + B[2]**2).toFixed(3);
    document.getElementById('results').innerHTML = `|A| = ${magA}, |B| = ${magB}`;
}

function addVectors() {
    const { A, B } = getVectors();
    const res = [A[0]+B[0], A[1]+B[1], A[2]+B[2]];
    document.getElementById('results').innerHTML = `A + B = (${res.join(', ')})`;
}

function subtractVectors() {
    const { A, B } = getVectors();
    const res = [A[0]-B[0], A[1]-B[1], A[2]-B[2]];
    document.getElementById('results').innerHTML = `A - B = (${res.join(', ')})`;
}

function dotProduct() {
    const { A, B } = getVectors();
    const res = (A[0]*B[0] + A[1]*B[1] + A[2]*B[2]).toFixed(3);
    document.getElementById('results').innerHTML = `A · B = ${res}`;
}

function crossProduct() {
    const { A, B } = getVectors();
    const res = [
        A[1]*B[2] - A[2]*B[1],
        A[2]*B[0] - A[0]*B[2],
        A[0]*B[1] - A[1]*B[0]
    ];
    document.getElementById('results').innerHTML = `A × B = (${res.join(', ')})`;
}

function angleBetween() {
    const { A, B } = getVectors();
    const dot = A[0]*B[0] + A[1]*B[1] + A[2]*B[2];
    const magA = Math.sqrt(A[0]**2 + A[1]**2 + A[2]**2);
    const magB = Math.sqrt(B[0]**2 + B[1]**2 + B[2]**2);
    const angle = Math.acos(dot / (magA * magB)) * (180/Math.PI);
    document.getElementById('results').innerHTML = `Angle = ${angle.toFixed(2)}°`;
}
