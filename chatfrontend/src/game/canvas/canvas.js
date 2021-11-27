import CanvasDraw from "react-canvas-draw";
import React, { useState, useRef} from "react";
function Canvas({user, drawer, socket }){
    const CanvasRef = useRef()
    const [data, setData] = useState("");
    const [brushSize, setbrushSize] = useState("12");
    const [brushColor, setbrushColor] = useState("#444")
    socket.on("do_drawing",(data)=>{
        setData(data.draw_data)
    });
    function Change_Brush_Size(e){
        setbrushSize(e.currentTarget.value)
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
            {user.id===drawer.id ? 
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
                                setData(drawing_data);
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


            :
                <div>
                    <CanvasDraw 
                        canvasWidth = {800}
                        canvasHeight= {800}
                        disabled
                        hideGrid
                        immediateLoading
                        saveData={data}
                    />
                    <div>
                        <input
                            defaultValue="10"
                            type="range"
                            min="1"
                            max="30"
                            disabled
                        />
                        <input
                            type="color"
                            disabled
                        />
                    </div>
                </div>
            }
        </div>
    );
    
}
export default Canvas;