import CanvasDraw from "react-canvas-draw";
import React, { useState, useRef} from "react";

function Drawercanvas({socket}){
    const CanvasRef = useRef()
    const [brushSize, setbrushSize] = useState(12);
    const [brushColor, setbrushColor] = useState("#444")
    function Change_Brush_Size(e){
        setbrushSize(Number(e.currentTarget.value))
    }
    function Change_Brush_Color(e){
        setbrushColor(e.currentTarget.value)
    }
    function Clear_Canvas(e){
        CanvasRef.current.clear()
        const drawing_data = CanvasRef.current.getSaveData()
        socket.emit("draw",drawing_data)
    }
    return(
        <div>
            <CanvasDraw 
                canvasWidth = {800}
                canvasHeight= {800}
                ref = { CanvasRef }
                hideGrid
                brushRadius = {brushSize}
                brushColor = {brushColor}
                onChange={() => 
                    {
                        const drawing_data = CanvasRef.current.getSaveData()
                        socket.emit("draw",drawing_data);
                    }
                } 
            />
            <div>
                <input
                    defaultValue="10"
                    type="range"
                    min="1"
                    max="30"
                    onChange={Change_Brush_Size}
                />
                <input
                    type="color"
                    id="toolColorPicker"
                    onChange={Change_Brush_Color}
                />
                <button
                    onClick={Clear_Canvas}>             
                Eraser</button>
            </div>
        </div>
    );
}

function Watchercanvas({socket}){
    const [drawing_data, setDrawdata] = useState("")
    socket.on("do_drawing",(data)=>{
        setDrawdata(data.draw_data)
    })
    return(
        <div>
            <CanvasDraw
                canvasWidth = {800}
                canvasHeight= {800}
                disabled
                hideInterface
                hideGrid
                immediateLoading
                saveData={drawing_data}
            />
        </div>
    );
}

function Canvas({user, drawer, socket }){
    return(
        <div>
            {user.id===drawer.id ? 
                <Drawercanvas
                    socket={socket}
                />
            :
                <Watchercanvas
                    socket={socket}
                />
            }
        </div>
    );    
}
export default Canvas;