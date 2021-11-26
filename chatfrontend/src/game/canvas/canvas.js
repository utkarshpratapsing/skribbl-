import CanvasDraw from "react-canvas-draw";
//import  ReactDOM  from "react-dom";
function Canvas(){
    return(<div><CanvasDraw
        onChange={() => console.log("onChange")} /></div>);
}
export default Canvas;