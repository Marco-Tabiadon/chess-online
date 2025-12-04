//piecesFIGURES list??

//se no pieceTYPE list: qui NO pic che calc da chessboard magari con funz calcpiece. startsquare white E black magari diversi. descr calcp
//anche color ofc calcp

const pieces = [
    {
        picture: 'WKF',
        startSquare: ['E1'],
        pieceType: 'king',
        isFirstMove: true,
        color: 'white',
        descr: 'white king',
    },
    {
        picture: 'WQF', // front back will be controlled by visualization
        startSquare: ['D1'],
        pieceType: 'queen',
        color: 'white',
        descr: 'white queen'
    },
    {
        picture: 'WRF', // front back will be controlled by visualization
        startSquare: ['A1', 'H1'],
        pieceType: 'rook',
        isFirstMove: true,
        color: 'white',
        descr: 'white rook'
    },
    {
        picture: 'WNF', // front back will be controlled by visualization
        startSquare: ['B1', 'G1'],
        pieceType: 'knight',
        color: 'white',
        descr: 'white knight'
    },
    {
        picture: 'WBF', // front back will be controlled by visualization
        startSquare: ['C1', 'F1'],
        pieceType: 'bishop',
        color: 'white',
        descr: 'white bishop'
    },
    {
        picture: 'WPF', // front back will be controlled by visualization
        startSquare: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
        pieceType: 'pawn',
        isFirstMove: true,
        color: 'white',
        descr: 'white pawn'
    }
]

export default pieces;

