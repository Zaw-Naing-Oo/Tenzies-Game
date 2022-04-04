import react from "react";
import reactDom from "react-dom";

export default function Die(props) {

    const style = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

   return (
       <div className="die-parent" onClick={props.holdDice} style={style}> 
          <div className="die">
              {props.value}
          </div>
       </div>
      
      
   );
}