import React from 'react';
import styles from './Stylesheet.module.css';

export class Analysis extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      percent: 0,
      frameAvg: 0
    }
  }

  getPercentage(){
    if (this.props.numRight + this.props.numWrong == 0){
      this.state.percent = 0;
      return;
    }
    if (this.props.numRight == 0){
      this.state.frameAvg = 0;
      return;
    }
    var percent = this.props.numRight/(this.props.numRight + this.props.numWrong);
    this.state.percent = Math.round(percent*1000) / 10;
    console.log(this.props.sumFrames);
    var avgFrame = Math.round(this.props.sumFrames/this.props.numRight);
    this.state.frameAvg = avgFrame;

  }

  render(){
    this.getPercentage();
    return(
      <div className = {styles.Analysis}>
        <div className = {styles.AnalysisHeading}>Stats Tracker</div>
        <div className = {styles.SuccessRate}>Success Rate:</div>
        <div
        style = {{color: this.state.percent < 50 ? "red" : this.state.percent > 80 ? "green" : "orange"}}
        className = {styles.SuccesRateNum}>{this.state.percent}%</div>
        <div className = {styles.AverageFrame}>Average Frame: <div style = {{textAlign: "right", marginRight: "8px"}}> {this.state.frameAvg} </div> </div>
        <div className = {styles.Missed}>Missed</div>
        <div className = {styles.GetUpAttacks}>Get Up Attacks:   <div style = {{textAlign: "right", marginRight: "8px"}}> {this.props.missed[0]} </div></div>
        <div className = {styles.GetUpAttacks}>Drop Down Aerials:   <div style = {{textAlign: "right", marginRight: "8px"}}> {this.props.missed[1]} </div></div>
        <div className = {styles.GetUpAttacks}>Jumps:   <div style = {{textAlign: "right", marginRight: "8px"}}> {this.props.missed[2]} </div></div>
        <div className = {styles.GetUpAttacks}>Normal Getups:   <div style = {{textAlign: "right", marginRight: "8px"}}> {this.props.missed[3]} </div></div>
        <div className = {styles.GetUpAttacks}>Rolls:   <div style = {{textAlign: "right", marginRight: "8px"}}> {this.props.missed[4]} </div></div>
      </div>
    )
  }
}
