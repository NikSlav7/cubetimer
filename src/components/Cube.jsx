import { useEffect, useRef, useState, useCallback} from "react"
import CubePic from "./CubePic";
import "../css/Cube.css"

function Cube(props){

    const cube= useRef(new Map());
    const [cubeState, setCubeState] = useState(null)

    
    useEffect(()=>{
        console.log("Scramble chagned: " + props.scrambleString)
        scramble(props.scrambleString)
    },[props.scrambleString])

    let sideMethods = {
        "R": turnRightSideClockwise,
        "L": turnLeftSideClockwise,
        "F": turnFrontSideClockwise,
        "B": turnBackSideClockwise,
        "D": turnDownSideClockwise,
        "U": turnUpSideClockwise
    }

    let sideNums= {
        "R": 2,
        "L": 0,
        "F": 1,
        "B": 3,
        "D": 5,
        "U": 4
    }
   

    function scramble(scramble){
        let moves = scramble.split(/\s+/)
        initCube();
        for (let i = 0; i < moves.length; i++){
            let moveKey = moves[i].charAt(0);
            let moveCount = 1;
            if (moves[i].includes("2")) moveCount = 2;
            else if (moves[i].includes("'")) moveCount = 3;
            for (let j = 0; j < moveCount; j++){
                sideMethods[moveKey]();
                turnSideClockwise(sideNums[moveKey])
            }
        }
        setCubeState(cube.current)
    }

    

    function initCube(){
        cube.current = new Map();
        let temp = new Map();
        for (let i = 0; i < 6; i++){
            let side = [[i,i,i],[i,i,i],[i,i,i]];
            temp.set(i, side);
        }
        cube.current = temp;
    }

    function swap(array, x1, y1, x2, y2){
        let temp = array[x1][y1]
        array[x1][y1] = array[x2][y2];
        array[x2][y2] = temp; 
    }
    function turnSideClockwise(sideNum){
        let temp = structuredClone(cube.current)
        let side = temp.get(sideNum);
        swap(side, 0,1,1,0);
        swap(side, 0,2,2,0)
        swap(side, 1, 2, 2,1);
        swap(side, 0,0,0,2);
        swap(side, 1, 0, 1, 2)
        swap(side, 2, 0, 2, 2)
        cube.current = temp;
    }
    function turnLeftSideClockwise(){
        let temp = structuredClone(cube.current);
        /*setting first side*/
        let green = temp.get(1);
        let white = temp.get(4);;
        let blue = temp.get(3);
        let yellow = temp.get(5);

        green[0][0] = cube.current.get(4)[0][0];
        green[1][0] = cube.current.get(4)[1][0] 
        green[2][0] = cube.current.get(4)[2][0] 


        yellow[0][0] = cube.current.get(1)[0][0]
        yellow[1][0] = cube.current.get(1)[1][0]
        yellow[2][0] = cube.current.get(1)[2][0]


        blue[2][2] = cube.current.get(5)[0][0]
        blue[1][2] = cube.current.get(5)[1][0]
        blue[0][2] = cube.current.get(5)[2][0]

        white[0][0] = cube.current.get(3)[2][2];
        white[1][0] = cube.current.get(3)[1][2] 
        white[2][0] = cube.current.get(3)[0][2] 

        cube.current = temp;
    }

    
    function turnRightSideClockwise(){
        let temp = structuredClone(cube.current);
        /*setting first side*/
        let green = temp.get(1);
        let white = temp.get(4);;
        let blue = temp.get(3);
        let yellow = temp.get(5);

        green[0][2] = cube.current.get(5)[0][2];
        green[1][2] = cube.current.get(5)[1][2] 
        green[2][2] = cube.current.get(5)[2][2] 


        yellow[0][2] = cube.current.get(3)[2][0]
        yellow[1][2] = cube.current.get(3)[1][0]
        yellow[2][2] = cube.current.get(3)[0][0]


        blue[2][0] = cube.current.get(4)[0][2]
        blue[1][0] = cube.current.get(4)[1][2]
        blue[0][0] = cube.current.get(4)[2][2]

        white[0][2] = cube.current.get(1)[0][2];
        white[1][2] = cube.current.get(1)[1][2] 
        white[2][2] = cube.current.get(1)[2][2] 

        cube.current = temp;
    }

    function turnBackSideClockwise(){
        let temp = structuredClone(cube.current);
        /*setting first side*/
        let red = temp.get(2);
        let white = temp.get(4);;
        let orange = temp.get(0);
        let yellow = temp.get(5);

        red[0][2] = cube.current.get(5)[2][2];
        red[1][2] = cube.current.get(5)[2][1] 
        red[2][2] = cube.current.get(5)[2][0] 


        yellow[2][2] = cube.current.get(0)[2][0]
        yellow[2][1] = cube.current.get(0)[1][0]
        yellow[2][0] = cube.current.get(0)[0][0]


        orange[0][0] = cube.current.get(4)[0][2]
        orange[1][0] = cube.current.get(4)[0][1]
        orange[2][0] = cube.current.get(4)[0][0]

        white[0][0] = cube.current.get(2)[0][2];
        white[0][1] = cube.current.get(2)[1][2] 
        white[0][2] = cube.current.get(2)[2][2] 

        cube.current = temp;
    }

    function turnUpSideClockwise(){
        let temp = structuredClone(cube.current);
        /*setting first side*/
        let red = temp.get(2);
        let green = temp.get(1);;
        let orange = temp.get(0);
        let blue = temp.get(3);

        green[0][0] = cube.current.get(2)[0][0];
        green[0][1] = cube.current.get(2)[0][1];
        green[0][2] = cube.current.get(2)[0][2];


        red[0][0] = cube.current.get(3)[0][0];
        red[0][1] = cube.current.get(3)[0][1];
        red[0][2] = cube.current.get(3)[0][2];

        blue[0][0] = cube.current.get(0)[0][0];
        blue[0][1] = cube.current.get(0)[0][1];
        blue[0][2] = cube.current.get(0)[0][2];

        orange[0][0] = cube.current.get(1)[0][0];
        orange[0][1] = cube.current.get(1)[0][1] 
        orange[0][2] = cube.current.get(1)[0][2] 

        cube.current = temp;
    }
    function turnDownSideClockwise(){
        let temp = structuredClone(cube.current);
        /*setting first side*/
        let red = temp.get(2);
        let green = temp.get(1);;
        let orange = temp.get(0);
        let blue = temp.get(3);

        green[2][0] = cube.current.get(0)[2][0];
        green[2][1] = cube.current.get(0)[2][1];
        green[2][2] = cube.current.get(0)[2][2];


        red[2][0] = cube.current.get(1)[2][0];
        red[2][1] = cube.current.get(1)[2][1];
        red[2][2] = cube.current.get(1)[2][2];

        blue[2][0] = cube.current.get(2)[2][0];
        blue[2][1] = cube.current.get(2)[2][1];
        blue[2][2] = cube.current.get(2)[2][2];

        orange[2][0] = cube.current.get(3)[2][0];
        orange[2][1] = cube.current.get(3)[2][1];
        orange[2][2] = cube.current.get(3)[2][2];

        cube.current = temp;
    }

    function turnFrontSideClockwise(){
        let temp = structuredClone(cube.current);
        /*setting first side*/
        let red = temp.get(2);
        let white = temp.get(4);;
        let orange = temp.get(0);
        let yellow = temp.get(5);

        red[0][0] = cube.current.get(4)[2][0];
        red[1][0] = cube.current.get(4)[2][1] 
        red[2][0] = cube.current.get(4)[2][2] 


        yellow[0][2] = cube.current.get(2)[0][0]
        yellow[0][1] = cube.current.get(2)[1][0]
        yellow[0][0] = cube.current.get(2)[2][0]


        orange[2][2] = cube.current.get(5)[0][2]
        orange[1][2] = cube.current.get(5)[0][1]
        orange[0][2] = cube.current.get(5)[0][0]

        white[2][0] = cube.current.get(0)[2][2];
        white[2][1] = cube.current.get(0)[1][2] 
        white[2][2] = cube.current.get(0)[0][2] 

        cube.current = temp;
    }
    /*
        4
    0   1   2   3
        5
    */

    return(
        <div className="cube-container">
            {cubeState !== null && <CubePic cube={cubeState}/>}
        </div>
    )
}
export default Cube;