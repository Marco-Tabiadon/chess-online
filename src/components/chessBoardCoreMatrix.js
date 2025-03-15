const chessBoardCoreMatrix = initializeChessBoardCoreMatrix();
function initializeChessBoardCoreMatrix() {
    let matrixArray = [];
    let yCoordNumber = 1;
    let xCoordNumber = 1;
    for (let index = 0; index < 64; index++) {
        matrixArray.push([xCoordNumber, yCoordNumber]);
        if (xCoordNumber < 8) xCoordNumber++;
        else {
            xCoordNumber = 1;
            yCoordNumber++;
        }
    }
    return matrixArray;
}

export default chessBoardCoreMatrix;
