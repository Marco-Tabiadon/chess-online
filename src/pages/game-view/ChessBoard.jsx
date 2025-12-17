import { useState } from 'react';
import chessBoardCoreMatrix from '../../components/chessBoardCoreMatrix.js';
import piecesList from '../../components/piecesList.js';
import PiecesContainer from './PiecesContainer.jsx';


function ChessBoard({initialize, communicateChessboardIsSet}) {
    const [mapOfSquareContents, setMapOfSquareContents] = useState({});
    const [squareToMoveFrom, setsquareToMoveFrom] = useState('');
    const [movingPiece, setmovingPiece] = useState({});
    const [controlChessPosition, setcontrolChessPosition] = useState('');

    const chessBoardColumns = 'HGFEDCBA';


    //White-pieces player implementation
    //from now on the best way to think about the chessboard is not XY coordinates but chessboard coordinates (A1 etc)
    //hence the reverse
    let reverseMatrix = [...chessBoardCoreMatrix].reverse();
    let implementedChessBoard = [];

    //the divs are built top down
    //this for the white player means that this list of letters needs to be in reverse order
    reverseMatrix.forEach(coordinates => {
        let chessCoordinatePosition = String(chessBoardColumns[coordinates[0]-1]) + String(coordinates[1])
        let squareColor = '';
        if (coordinates[0]%2 == 0) {
            squareColor = coordinates[1]%2 == 0 ? 'even-square' : 'odd-square';
        } else {
            squareColor = coordinates[1]%2 == 0 ? 'odd-square' : 'even-square';
        }
        implementedChessBoard.push(
            <div className={ squareColor }
                chessposition={chessCoordinatePosition}
                id={chessCoordinatePosition}
                key={chessCoordinatePosition}
                onClick={selectSquare}
            >
                {mapOfSquareContents[chessCoordinatePosition]?.coordinateInstance}
            </div>
        );
    })

    let arrOfChessboardCoordinatesAndInstances = {};

    if (initialize && Object.keys(mapOfSquareContents).length == 0) {
        setMapOfSquareContents(arrOfChessboardCoordinatesAndInstances)
    }
    if (initialize) communicateChessboardIsSet()


    if (initialize) {
        let reverseMatrix = chessBoardCoreMatrix.reverse();
        reverseMatrix.forEach(matrixCoordinates => {
            arrOfChessboardCoordinatesAndInstances[String(chessBoardColumns[matrixCoordinates[0]-1]) + String(matrixCoordinates[1])] = {
                coord: matrixCoordinates,
                chessPosition: String(chessBoardColumns[matrixCoordinates[0]-1]) + String(matrixCoordinates[1]),
                coordinateInstance: <></>
            }
        });

        piecesList.forEach(piece => {
            //FOREACH DI STARTSQ CHE ORA ARRAY
            Object.values(arrOfChessboardCoordinatesAndInstances).map(coord => coord.chessPosition).forEach(chessCoordPosition => {
                if (piece.startSquare.includes(chessCoordPosition)) {
                    arrOfChessboardCoordinatesAndInstances[chessCoordPosition].coordinateInstance = <>
                        <PiecesContainer
                            piece={piece.picture}
                            isfirstmove={piece?.isFirstMove}
                            piecetype={piece.pieceType}
                            alt={piece.descr}
                        />
                    </>
                }
            })
        });
    }

    return (
        <>
            <div className='checkeredBoardContainer'>
                <div className="checkeredBoard">
                    {implementedChessBoard}
                </div>
            </div>
        </>
    );


    function selectSquare(event) {  
        arrOfChessboardCoordinatesAndInstances = { ...mapOfSquareContents };
        
        if (!event.target.closest(`svg`)) return;

        let chessPosition = event.target.closest(`svg`).parentElement.attributes?.chessposition?.value ||
            event.target.attributes?.chessposition.value;

        console.log(chessPosition)
        console.log(controlChessPosition)
        if (chessPosition == controlChessPosition) {
            //selection is cancelled
            Object.entries(arrOfChessboardCoordinatesAndInstances).forEach(coord => {
                if (document.getElementById(coord[0]).querySelector('svg')?.attributes.piece?.nodeValue == 'dot' || document.getElementById(coord[0]).querySelector('svg')?.attributes.piece?.nodeValue == 'castlingDot') {
                    arrOfChessboardCoordinatesAndInstances[coord[0]].coordinateInstance = <>
                    </>
                }
            })
            setcontrolChessPosition('');
            setMapOfSquareContents(arrOfChessboardCoordinatesAndInstances);
            return;

        } else setcontrolChessPosition(chessPosition);
            
        let type = '';
        let isFirstMove = '';
        let isCastlingPosition = '';
        
        
        if (event.target.closest(`svg`).getAttribute('piece') == 'castlingDot') {   
            if (event.target.closest(`svg`).parentElement.attributes?.chessposition?.value == 'C1') {
                // long
                let towerPiece = arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 2] + chessPosition[1]].coordinateInstance?.props?.children?.props;
                arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 2] + chessPosition[1]].coordinateInstance = <>
                </>
                arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 1] + chessPosition[1]].coordinateInstance = <>
                    { <PiecesContainer
                        piece={towerPiece.piece}
                        piecetype={towerPiece.piecetype}
                        isfirstmove = {false}
                        alt={towerPiece.alt}
                    /> }
                </>
                isCastlingPosition = chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 1] + chessPosition[1];
            } else if (event.target.closest(`svg`).parentElement.attributes?.chessposition?.value == 'G1') {
                // short
                let towerPiece = arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 1] + chessPosition[1]].coordinateInstance?.props?.children?.props;
                arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 1] + chessPosition[1]].coordinateInstance = <>
                </>
                arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 1] + chessPosition[1]].coordinateInstance = <>
                    { <PiecesContainer
                        piece={towerPiece.piece}
                        piecetype={towerPiece.piecetype}
                        isfirstmove = {false}
                        alt={towerPiece.alt}
                    /> }
                </>
                isCastlingPosition = chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 1] + chessPosition[1];
            }
        };  


        if (event.target.closest(`svg`).getAttribute('piece') == 'dot' || event.target.closest(`svg`).getAttribute('piece') == 'castlingDot') {
            let chessPosition = event.target.closest(`svg`).parentElement.attributes?.chessposition?.value ||
                event.target.attributes?.chessposition.value;
            arrOfChessboardCoordinatesAndInstances[squareToMoveFrom].coordinateInstance = <>
            </>
            arrOfChessboardCoordinatesAndInstances[chessPosition].coordinateInstance = <>
                { <PiecesContainer
                    piece={movingPiece.piece}
                    piecetype={movingPiece.piecetype}
                    isfirstmove = {false}
                    alt={movingPiece.alt}
                /> }
            </>

            Object.entries(arrOfChessboardCoordinatesAndInstances).forEach(coord => {
                //come funz attributes?
                if ((document.getElementById(coord[0]).querySelector('svg')?.attributes.piece?.nodeValue == 'dot' || document.getElementById(coord[0]).querySelector('svg')?.attributes.piece?.nodeValue == 'castlingDot') && 
                    !(coord[0] == chessPosition)
                ) {
                    if (coord[0] != isCastlingPosition) {
                        arrOfChessboardCoordinatesAndInstances[coord[0]].coordinateInstance = <>
                        </>
                    }
                }
            })
            setcontrolChessPosition('');
            setMapOfSquareContents(arrOfChessboardCoordinatesAndInstances);
            return;
        };

        if (chessPosition && arrOfChessboardCoordinatesAndInstances[chessPosition].coordinateInstance.props?.children) {
            setsquareToMoveFrom(chessPosition);
            type = arrOfChessboardCoordinatesAndInstances[chessPosition].coordinateInstance.props.children.props.piecetype;
            isFirstMove = arrOfChessboardCoordinatesAndInstances[chessPosition].coordinateInstance.props.children.props?.isfirstmove;
            let moveDotsPositions = selectMoveDotsPositions(type, arrOfChessboardCoordinatesAndInstances[chessPosition].coord, isFirstMove);
            let moveDotsChessCoords = Object.entries(arrOfChessboardCoordinatesAndInstances).filter(coordEntry => {
                return moveDotsPositions.find(e => e == coordEntry[0]);
            })
            setmovingPiece(arrOfChessboardCoordinatesAndInstances[chessPosition].coordinateInstance.props.children.props);

            moveDotsChessCoords.forEach(coord => {
                arrOfChessboardCoordinatesAndInstances[coord[0]].coordinateInstance = <>
                    <PiecesContainer
                        piece='dot'
                    />
                </>
            })
            if (type == 'king' && isFirstMove) {
                isAnyCastlingPathFree(chessPosition);
            }
        }
        setcontrolChessPosition('');
        setMapOfSquareContents(arrOfChessboardCoordinatesAndInstances);
    }

    function isAnyCastlingPathFree(chessPosition) {
        if (arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 1] + chessPosition[1]].coordinateInstance.props.children.props.piece == 'dot' &&
            Object.keys( arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 2] + chessPosition[1]].coordinateInstance.props) == 0 &&
            Object.keys( arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 3] + chessPosition[1]].coordinateInstance.props) == 0 &&
            arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) + 4] + chessPosition[1]].coordinateInstance?.props?.children?.props?.isfirstmove
            )   {
            applyCastlingPosition('long', chessPosition);
        }

        if (arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 1] + chessPosition[1]].coordinateInstance.props.children.props.piece == 'dot' &&
            Object.keys( arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 2] + chessPosition[1]].coordinateInstance.props) == 0 &&
            arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(chessPosition[0]) - 3] + chessPosition[1]].coordinateInstance?.props?.children?.props?.isfirstmove
            )   {
            applyCastlingPosition('short', chessPosition);
        }
    }

     function applyCastlingPosition(type, kingPosition) {
        if (type == 'long') {
            arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(kingPosition[0]) + 2] + kingPosition[1]].coordinateInstance = <>
                <PiecesContainer
                    piece='castlingDot'
                />
            </>
        }
        if (type == 'short') {
            arrOfChessboardCoordinatesAndInstances[chessBoardColumns[chessBoardColumns.split("").indexOf(kingPosition[0]) - 2] + kingPosition[1]].coordinateInstance = <>
                <PiecesContainer
                    piece='castlingDot'
                />
            </>
        }
     }

    function selectMoveDotsPositions(pieceType, pieceCoord, isFirstMove) {
        Object.entries(arrOfChessboardCoordinatesAndInstances).forEach(coord => {
            if (document.getElementById(coord[0]).querySelector('svg')?.attributes.piece?.nodeValue == 'dot' || document.getElementById(coord[0]).querySelector('svg')?.attributes.piece?.nodeValue == 'castlingDot') {
                arrOfChessboardCoordinatesAndInstances[coord[0]].coordinateInstance = <>
                </>
            }
        })

        let results = [];

        if (pieceType == 'king') {
            results = Object.values(arrOfChessboardCoordinatesAndInstances).map(coord => coord.coord).filter(arrCoordInstance => {
                return (
                    (arrCoordInstance[0] == pieceCoord[0]) &&
                    (Math.abs(arrCoordInstance[1] - pieceCoord[1]) == 1)
                    ||
                    (arrCoordInstance[1] == pieceCoord[1]) &&
                    (Math.abs(arrCoordInstance[0] - pieceCoord[0]) == 1)
                    ||
                    (Math.abs(arrCoordInstance[1] - pieceCoord[1]) == 1) &&
                    (Math.abs(arrCoordInstance[0] - pieceCoord[0]) == 1)
                );
            });
        }

        if (pieceType == 'pawn') {
            results = Object.values(arrOfChessboardCoordinatesAndInstances).map(coord => coord.coord).filter(arrCoordInstance => {
                if (isFirstMove) {
                    return (
                        (arrCoordInstance[0] == pieceCoord[0]) &&
                        (arrCoordInstance[1] - pieceCoord[1] == 1 || arrCoordInstance[1] - pieceCoord[1] == 2)

                    );
                } else {
                    return (
                        (arrCoordInstance[0] == pieceCoord[0]) &&
                        (arrCoordInstance[1] - pieceCoord[1] == 1)
                    );
                };
            });
        }

        if (pieceType == 'knight') {
            results = Object.values(arrOfChessboardCoordinatesAndInstances).map(coord => coord.coord).filter(arrCoordInstance => {
                return (
                    //prima -1 poi +1
                    ((Math.abs(arrCoordInstance[1] - pieceCoord[1]) == 2)
                     && ((((arrCoordInstance[1] == pieceCoord[1] + 2) && ((arrCoordInstance[0] == pieceCoord[0] + 1) || (arrCoordInstance[0] == pieceCoord[0] - 1)))
                     || ((arrCoordInstance[1] == pieceCoord[1] - 2) && ((arrCoordInstance[0] == pieceCoord[0] + 1) || (arrCoordInstance[0] == pieceCoord[0] - 1)))
                    )
                    )) ||
                    ((Math.abs(arrCoordInstance[1] - pieceCoord[1]) == 1)
                     && ((((arrCoordInstance[1] == pieceCoord[1] + 1) && ((arrCoordInstance[0] == pieceCoord[0] + 2) || (arrCoordInstance[0] == pieceCoord[0] - 2)))
                     || ((arrCoordInstance[1] == pieceCoord[1] - 1) && ((arrCoordInstance[0] == pieceCoord[0] + 2) || (arrCoordInstance[0] == pieceCoord[0] - 2)))
                    )
                    ))
                );
            });
        }

        let rookMovement = function () {
            return Object.values(arrOfChessboardCoordinatesAndInstances).map(coord => coord.coord).filter(arrCoordInstance => {
                return (
                    (arrCoordInstance[0] == pieceCoord[0]) || 
                    (arrCoordInstance[1] == pieceCoord[1])
                );
            });
        }

        if (pieceType == 'rook') {
            results = rookMovement();
        }

        let bishopMovement = function () {
            return Object.values(arrOfChessboardCoordinatesAndInstances).map(coord => coord.coord).filter(arrCoordInstance => {
                return (
                    //coord0 - piece0 == cood1 - èpiece1
                    (arrCoordInstance[0] - pieceCoord[0] == arrCoordInstance[1] - pieceCoord[1])
                    || (arrCoordInstance[0] +arrCoordInstance[1] == pieceCoord[0] + pieceCoord[1])
                );
            });
        }

        if (pieceType == 'bishop') {
            results = bishopMovement();
        }

        if (pieceType == 'queen') {
            results = bishopMovement().concat(rookMovement());
        }

        //when clicking on a piece the previous selection is cancelled
        results = results.map(coord => Object.entries(arrOfChessboardCoordinatesAndInstances).find(elemCoord => {
            return elemCoord[1].coord[0] == coord[0] && elemCoord[1].coord[1] == coord[1];
        })[1].chessPosition);

        let coordPiece = Object.entries(arrOfChessboardCoordinatesAndInstances).find(elemCoord => {
            return elemCoord[1].coord[0] == pieceCoord[0] && elemCoord[1].coord[1] == pieceCoord[1];
        })[1].chessPosition;

        let svgNotOver = [];
        results.forEach(square => {
            if (document.getElementById(square).querySelector('svg')) {
                if ((document.getElementById(square).querySelector('svg')?.parentElement.getAttribute('chessPosition') != coordPiece) && arrOfChessboardCoordinatesAndInstances[square].coordinateInstance.props.children?.props) {
                    svgNotOver.push(document.getElementById(square).querySelector('svg')?.parentElement.getAttribute('chessPosition'));
                }
            }
        });
        results = results.filter(square => {
            let result = true
            if (pieceType != 'knight') svgNotOver.forEach(posiz => {
                if ((chessBoardColumns.split("").indexOf(posiz[0]) < chessBoardColumns.split("").indexOf(coordPiece[0]) && posiz[1] == coordPiece[1]) &&
                    (chessBoardColumns.split("").indexOf(square[0]) <= chessBoardColumns.split("").indexOf(posiz[0]) && posiz[1] == square[1])
                ) result = false;

                if ((chessBoardColumns.split("").indexOf(posiz[0]) > chessBoardColumns.split("").indexOf(coordPiece[0]) && posiz[1] == coordPiece[1]) &&
                    (chessBoardColumns.split("").indexOf(square[0]) >= chessBoardColumns.split("").indexOf(posiz[0]) && posiz[1] == square[1])
                ) result = false;

                if ((posiz[1] > coordPiece[1] && chessBoardColumns.split("").indexOf(posiz[0]) == chessBoardColumns.split("").indexOf(coordPiece[0])) &&
                    (square[1] >= posiz[1] && chessBoardColumns.split("").indexOf(square[0]) == chessBoardColumns.split("").indexOf(posiz[0]))
                ) result = false;

                if ((posiz[1] < coordPiece[1] && chessBoardColumns.split("").indexOf(posiz[0]) == chessBoardColumns.split("").indexOf(coordPiece[0])) &&
                    (square[1] <= posiz[1] && chessBoardColumns.split("").indexOf(square[0]) == chessBoardColumns.split("").indexOf(posiz[0]))
                ) result = false;

                //BISHOP MOVES BLOCKS
                if ((posiz[1] > coordPiece[1] && chessBoardColumns.split("").indexOf(posiz[0]) > chessBoardColumns.split("").indexOf(coordPiece[0])) &&
                    (square[1] >= posiz[1] && chessBoardColumns.split("").indexOf(square[0]) >= chessBoardColumns.split("").indexOf(posiz[0])) &&
                    (square[1] - posiz[1] == chessBoardColumns.split("").indexOf(square[0]) - chessBoardColumns.split("").indexOf(posiz[0]))
                ) result = false;

                if ((posiz[1] < coordPiece[1] && chessBoardColumns.split("").indexOf(posiz[0]) < chessBoardColumns.split("").indexOf(coordPiece[0])) &&
                    (square[1] <= posiz[1] && chessBoardColumns.split("").indexOf(square[0]) <= chessBoardColumns.split("").indexOf(posiz[0])) &&
                    (square[1] - posiz[1] == chessBoardColumns.split("").indexOf(square[0]) - chessBoardColumns.split("").indexOf(posiz[0]))
                ) result = false;

                if ((posiz[1] > coordPiece[1] && chessBoardColumns.split("").indexOf(posiz[0]) <= chessBoardColumns.split("").indexOf(coordPiece[0])) &&
                    (square[1] >= posiz[1] && chessBoardColumns.split("").indexOf(square[0]) <= chessBoardColumns.split("").indexOf(posiz[0])) &&
                    (square[1] - posiz[1] == chessBoardColumns.split("").indexOf(posiz[0]) - chessBoardColumns.split("").indexOf(square[0]))
                ) result = false;

                if ((posiz[1] < coordPiece[1] && chessBoardColumns.split("").indexOf(posiz[0]) >= chessBoardColumns.split("").indexOf(coordPiece[0])) &&
                    (square[1] <= posiz[1] && chessBoardColumns.split("").indexOf(square[0]) >= chessBoardColumns.split("").indexOf(posiz[0])) &&
                    (posiz[1] - square[1] == chessBoardColumns.split("").indexOf(square[0]) - chessBoardColumns.split("").indexOf(posiz[0]))
                ) result = false;

            })
            if (!result) return result;
            return  (!document.getElementById(square).querySelector('svg') || (document.getElementById(square).querySelector('svg') && !arrOfChessboardCoordinatesAndInstances[square].coordinateInstance.props.children?.props));
        })
        return results;
    }
}

export default ChessBoard;
