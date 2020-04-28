import React from 'react';
import styles from './Stylesheet.module.css';

const actions = ["get up attack", "drop down aerial", "jump", "neutral getup", "roll"];
export class ResultMessage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message : "",
      border: ""
    }
  }


  setBorderCorrect(){
    this.state.border = "solid #D1E072 4px";
  }

  setBorderWrong(){
    this.state.border = "solid #E80000 4px";
  }

  setMessage(){
    var mes = "";
    if (this.props.givenAction == 5 && !this.props.tooSlow){
      return this.state.message;
    }
    if (this.props.chosenAction == 6  && !this.props.tooSlow){
      return this.state.message;
    }
    if (this.props.givenAction == this.props.chosenAction){
      mes = "Good job! You reacted on frame " + this.props.faf + ". Press Enter to restart.";
      this.setBorderCorrect();
    }
    else {
      this.setBorderWrong();
      if (this.props.tooSlow){
        mes = "You were too slow. Press Enter to restart.";
      }
      else {
        mes = "You picked " + actions[this.props.chosenAction] + " when the CPU did a " + actions[this.props.givenAction] + ". Press Enter to restart.";
      }
    }
    return mes;
  }

  render(){
    var mes = this.setMessage();
    this.state.message = mes;
    return <div style = {{border: this.state.border}}
                className = {styles.ResultMessage} >{mes}</div>
  }
}
