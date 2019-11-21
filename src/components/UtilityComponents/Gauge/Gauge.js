import React, {Component} from 'react';
import Gauge from 'gauge-animated';
import './Gauge.css';
  
//   const g1 = new ReactGaug(document.querySelector('#gauge1'), {
//     size: 390,
//     P: 100,
//     D: 10,
//     faceText: '[km/h]',
//     max: 280,
//     stepValue: 2.5,
//     mediumSteps: 2,
//     largeSteps: 4,
//     labelSteps: 4,
//     valueDisplay: true,
//     markerWidths: step => (step > 99 ? 10 : undefined),
//     markerLengths: step => (step > 99 ? 10 : undefined),
//     markerColors:  step => `rgb(
//         ${(255-step*(255/100)).toFixed(0)},
//         ${100},
//         ${(80+step).toFixed(0)})`,
//     // labelDivider: 1,
//     // labelRadius: 0.82,
//     // font: '19px arial',
//   });



class GaugeComponent extends Component {
    constructor(props){
        super(props);
        let gaugeProps = {
            size: 60,
            P: 10,
            D: 100,
            min: 0,
            max: this.props.emotionMeter ? 180 : 360,
            stepValue: this.props.showHand ? 3 : 2.5,
            value: this.props.value,
            mediumSteps: 2,
            largeSteps: 0,
            labelSteps: 0,
            valueDisplay: !this.props.hideValue,
            valueDisplayRadius: -0.1,
            markerWidths: step => !this.props.showHand || this.props.emotionMeter ? 5 : undefined,
            markerLengths: step => !this.props.showHand || this.props.emotionMeter ? 10 : undefined,
            markerColors: step => {
                let randChoice = Math.floor(Math.random() * 3) + 1  ;
                return `rgb(
                    ${(step*5-20).toFixed(0)},
                    ${(-(step-10)*(step-80)/6).toFixed(0)},
                    ${(255-step*3).toFixed(0)})`
                
            },
            needleSvg: (size) => {
                const c = 250;
                const scale = size / 500;
                let div = document.createElement('div');
                div.innerHTML = this.props.showHand ? `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="width:${size}px; height:${size}px;">
                    <g>
                    <g transform="scale(${scale})">
                        <circle cx="${c}" cy="${c}" r="15" style="fill:#000"/>
                        <path d="M ${c} ${c+6} L ${c*1.9} ${c} L ${c} ${c-6} z" fill="#000" stroke="#111"/>
                    </g>
                    </g>
                </svg>` : `
                <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="width:${size}px; height:${size}px;">
                    <g>
                    <g transform="scale(${scale})">
                        <path d="M ${c*1.85} ${c+13} L ${c*1.99} ${c} L ${c*1.85} ${c-13} z" fill="#ffffff00"/>
                    </g>
                    </g>
                </svg>`;
                return div;
            }
        }
        if(!!this.props.emotionMeter) {
            gaugeProps = {
                ...gaugeProps,
                startAngle: Math.PI,
                stopAngle: Math.PI*2,
                needleAngleMin: Math.PI,
                needleAngleMax: Math.PI*2
            }
        }
        this.state = {
            gaugeProps: gaugeProps
        };
    }
    componentDidMount() {
        this.gauge = new Gauge(this.div, this.state.gaugeProps);
        this.gauge.setTarget(this.state.gaugeProps.value);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.value !== this.props.value) this.gauge.setTarget(nextProps.value);
        return false;
    }
    
    render(){
        return (
            <div className="gauge-container" ref={c => this.div = c}></div>
        )
    }
}

export default GaugeComponent;
