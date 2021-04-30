import React from "react";

function ColorItem(props) {
    const classes = ['picker']
    if(props.isActive){
        classes.push('active')
    }
    return (
        <div className={classes.join(' ')}>
            <label style={{backgroundColor: props.color}}> <input type="radio"
                                                                  className="browser-default"
                                                                  name="color"
                                                                  onChange={event => props.onChange(event.target.value)}
                                                                  value={props.color}
            /><span></span></label>
        </div>
    )
}

export default ColorItem