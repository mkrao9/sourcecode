import React from 'react';
import ReactDOM from 'react-dom';
import {ResultMessage} from './ResultMessage';
import {InstButton} from './InstButton';
import {Analysis} from './Analysis'
import styles from './Stylesheet.module.css';


const gifs = ["attack.gif", "dd_fair.gif", "jump_nair.gif", "normal_getup.gif", "roll.gif", "hang.jpg"];
const keys = [32, 83, 87, 68, 65];
const MISSED_QUEUE_SIZE = 15;
const missedQueue = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

export class ImageDisplay extends React.Component {
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      start: false,
      currentNum: 5,
      currentDisplay: gifs[5],
      timeInit: 0,
      lockout: false,
      chosenAction: 6,
      faf: 0,
      tooSlow: false,
      instrunctions: "inline",
      numRight: 0,
      numWrong: 0,
      sumFrames: 0,
      missed: [0,0,0,0,0]
    }
  }

  handleKeyPress = (e) =>{
    if (this.state.lockout){
      return;
    }

    if (e.keyCode == 13|| e.keyCode == 32){
      e.preventDefault();
    }

    if (!this.state.start && e.keyCode == 13){
      var randTime = Math.random()*2000;
      this.setState({start: true});
      console.log(this.props.buffer);
      setTimeout( e => {
        this.setState(
          {
            instrunctions: "none",
            timeInit: Date.now(),
            currentNum: this.calculateValue(),
            start: true,
          });
        this.setState({currentDisplay: gifs[this.state.currentNum]})
        setTimeout(e =>{
          const newMissed = this.state.missed.slice();
          newMissed[this.state.currentNum] = newMissed[this.state.currentNum] + 1;
          missedQueue.pop();
          missedQueue.unshift(this.state.currentNum);
          this.setState(
          {missed: newMissed, instrunctions: "none", tooSlow: true, currentDisplay: gifs[5], start: false, lockout: false, currentNum: 5, faf: 0, chosenAction: 6, numWrong: this.state.numWrong + 1}
        )}
        , this.props.difficulty);
      }, randTime);
    }

    if (this.state.start){
      if (keys[this.state.currentNum] == e.keyCode){
        var timeFinal = Date.now();
        this.setState({faf: (Math.round( (timeFinal - this.state.timeInit + this.props.buffer) / 1000 * 60.0))});
        this.setState({lockout: true});
        this.setState({chosenAction: this.state.currentNum})
        this.setState(
        {sumFrames: this.state.sumFrames + this.state.faf, instrunctions: "none", tooSlow: !this.state.lockout, currentDisplay: gifs[5], start: false, lockout: false, currentNum: 5, tooSlow: false, faf: 0, chosenAction: 6, numRight: this.state.numRight + 1}  )
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }
      }
      else {
        var i = 0;
        while (i < keys.length){
          if (keys[i] == e.keyCode){
            missedQueue.pop();
            missedQueue.unshift(this.state.currentNum);
            this.setState({lockout: true});
            this.setState({chosenAction: i})
            const newMissed = this.state.missed.slice();
            newMissed[this.state.currentNum] = newMissed[this.state.currentNum] + 1;
            this.setState({missed: newMissed});
            this.setState(
            {instrunctions: "none", tooSlow: !this.state.lockout, currentDisplay: gifs[5], start: false, lockout: false, currentNum: 5, tooSlow: false, faf: 0, chosenAction: 6, instrunctions: "inline", numWrong: this.state.numWrong + 1}  )
            var highestTimeoutId = setTimeout(";");
            for (var i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i);
            }
            break;
          }
          i++;
        }

      }
    }
  }

  calculateValue(){
    if (!this.props.adaptation){
      return Math.floor(Math.random()*5);
    }
    var pick = Math.floor(Math.random()*30);
    if (pick >= 15){
      return (Math.floor(Math.random()*5));
    }
    else if (missedQueue[pick] == -1){
      return (Math.floor(Math.random()*5));
    }
    else{
      return missedQueue[pick];
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress);
  }



  render(){
    return (
      <div>
        <img
        src = {this.state.currentDisplay}
        className = {styles.game}/>
        <ResultMessage givenAction = {this.state.currentNum}
          tooSlow = {this.state.tooSlow}
          faf = {this.state.faf}
          givenAction = {this.state.currentNum}
          chosenAction = {this.state.chosenAction} />
        <InstButton instrunctions = {this.state.start}/>
        <Analysis numRight = {this.state.numRight} numWrong = {this.state.numWrong}
          missed= {this.state.missed} sumFrames = {this.state.sumFrames}/>
      </div>
    )
  }
}
