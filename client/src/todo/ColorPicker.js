import React from "react";
import ColorItem from "./ColorItem"


function ColorPicker(props){

    return (
        <div className="color-picker">
            {
                props.colors.map((color, i) => {
                    return <ColorItem color={color}
                                      isActive={color === props.value}
                                      key={i}
                                      onChange={props.onColorChange}
                    />
                })
            }

        </div>
    )

}

export default ColorPicker