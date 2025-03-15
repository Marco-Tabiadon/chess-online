import chessBoardCoreMatrix from '../../components/chessBoardCoreMatrix.js';
function ChessBoard() {
    //White-pieces player implementation
    const visualChessboard = buildVisualChessBoard(chessBoardCoreMatrix);
    function buildVisualChessBoard(matrix) {
        let reverseMatrix = [...matrix].reverse();
        let visualChessboard = [];

        //the divs are built top down
        //this for the white player means that this list of letters needs to be in reverse order
        let chessBoardColumns = 'HGFEDCBA';
        reverseMatrix.forEach(position => {
            let squareColor = '';
            if (position[0]%2 == 0) {
                squareColor = position[1]%2 == 0 ? 'even-square' : 'odd-square';
            } else {
                squareColor = position[1]%2 == 0 ? 'odd-square' : 'even-square';
            }
            visualChessboard.push(
                <div className={ 'chess-square ' + squareColor}
                    id={String(chessBoardColumns[position[0]-1]) + String(position[1])}
                    key={String(chessBoardColumns[position[0]-1]) + String(position[1])}
                >
                </div>
            );
        })
        return visualChessboard;
    }
    return (
        <>
            <div className='checkeredBoardContainer'>
                <div className="checkeredBoard">
                    {visualChessboard}
                </div>
            </div>
        </>
    )
}
export default ChessBoard;
