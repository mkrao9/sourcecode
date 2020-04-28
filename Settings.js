import React from 'react';
import ReactDOM from 'react-dom';
import {ImageDisplay} from './ImageDisplay';
import styles from './Stylesheet.module.css';
import Slider from 'react-input-slider';
import Switch from "react-switch";

export class Settings extends React.Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      difficulty: 50,
      buffer: 100,
      display: "none",
      checked: true
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleKeyDown(e){
    this.setState({display: "none"});
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleChange(checked) {
     this.setState({ checked });
   }

  handleClick(e){
    if (this.state.display == "none"){
      this.setState({display: "inline"})
    }
    else{
      this.setState({display: "none"})
    }
  }

  render(){
    return(
      <div>
        <button
          onClick = {this.handleClick}
          className = {styles.SettingsButton}>
          <img src = "/settings.png" className = "settingsImage"/>
        </button>
        <div className = {styles.SettingsPane}
              style = {{display: this.state.display}}>
              <h1 className = {styles.SettingsWord}>Game Options</h1>
              <hr style = {{borderColor: "black"}}/>
              <div className = {styles.Vertical}></div>
              <div className = {styles.Difficulty}>
                Difficulty<Slider className = {styles.DifficultySlider} axis ="x"
                x = {this.state.difficulty}
                onChange={({x}) => this.setState({difficulty: x})}
                styles = {{track : {backgroundColor: 'blue'}, active: {backgroundColor: "blue"}, thumb: {backgroundColor: this.state.difficulty > 75 ? "red" : this.state.difficulty < 30 ? "green" : "orange"}}}/>
              </div>

              <p className = {styles.Ez}>Very Easy</p>
              <p className = {styles.Medium}>Medium</p>
              <p className = {styles.Hard}>Very Hard</p>

              <div className = {styles.Buffer}>
                Buffer<Slider className = {styles.BufferSlider} axis ="x"
                x = {this.state.buffer}
                xmax = {150}
                xmin = {50}
                onChange={({x}) => this.setState({buffer: x})}
                styles = {{track : {backgroundColor: 'blue'}, active: {backgroundColor: "blue"}, thumb: {backgroundColor: "black"}}}/>
              </div>
              <p className = {styles.Buff500}>500ms</p>
              <p className = {styles.Buff1500}>1500ms</p>
              <div className = {styles.Adaptation}>Enable Adaptation</div>
              <Switch className = {styles.AdaptationSwitch}
                       onChange={this.handleChange} checked={this.state.checked}
                       width= {100}
                       height = {50}/>
              <h1 className = {styles.Characters}>Character Select</h1>
              <img className = {styles.SmashBall} src = "https://upload.wikimedia.org/wikipedia/commons/1/1b/SmashBall.svg"/>
              <p className = {styles.ComingSoon}>Coming Soon...</p>
        </div>
        <ImageDisplay difficulty = {1350 - 6*this.state.difficulty}
                      buffer = {this.state.buffer}
                       adaptation = {this.state.adaptation}/>
      </div>
    )
  }
}
