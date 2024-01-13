import React, { Component, useState } from 'react';
import "./App.css";
import axios from 'axios';


export class App extends Component {

    state = { advice: '',colour: '', };

    componentDidMount() {
        this.fetchAdvice();
        this.randColorGen();
    }

    fetchAdvice = () => {
        axios.get("https://api.adviceslip.com/advice")
        .then((res) => {
            const { advice } = res.data.slip;
            this.setState({ advice });
        })
        .catch((error) => {
            console.log("Something looks odd !!! Error =",error);
        })
        this.randColorGen();
    }

    randColorGen = () => {
        let maxVal = 0xFFFFFF;
        let randNum = Math.random() * maxVal;
        randNum = Math.floor(randNum);
        randNum = randNum.toString(16);
        let randColor = randNum.padStart(6,0);
        this.setState({ colour:`#${randColor.toUpperCase()}`});
    }


    render() {
        return (
            <div className='app'  style={{backgroundColor: this.state.colour ,opacity: 0.8}}>
                <div className='card'>  
                    <h1 className='heading' style={{color: this.state.colour }}>
                        { this.state.advice }
                    </h1>
                    <button className='button' onClick={this.fetchAdvice}>
                        <span>New Advice !</span>
                    </button>
                </div>
            </div>
        )
    }}

export default App;
