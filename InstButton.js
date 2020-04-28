import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Stylesheet.module.css';

export class InstButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: "inline"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(e){
    if (this.props.instrunctions){
      this.setState({display: "none"})
      return;
    }
    if (this.state.display == "none"){
      this.setState({display: "inline"})
    }
    else{
      this.setState({display: "none"})
    }

  }

  handleKeyDown(e){
    this.setState({display: "none"});
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }



  render(){
    return(
      <div>
        <button
          onClick = {this.handleClick}
          className = {styles.InstButton}>
          <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1024px-Infobox_info_icon.svg.png" className = "image"/>
        </button>
        <div className = {styles.InstMessage}
          style ={{display: this.state.display}}>
            <h1>Welcome to the Ledgetrap Trainer! When Lucina moves, press the key corresponding to her ledge option as quickly as possible. Press any key to close this screen.  <br/> W - Jump <br/> A - Roll <br/> S - Drop Down Aerial <br/> D - Normal Getup <br/> Space - Get Up Attack<br/> <br/> Be careful! The CPU is smart and will not always get up at the same time. It will also adapt and pick options that you missed recently at a higher rate.   </h1>
        </div>
      </div>
    )
  }
}
