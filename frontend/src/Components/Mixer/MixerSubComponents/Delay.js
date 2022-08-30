import React from "react";
import "../../../Styles/mixerSubComponentStyles/delay.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


/**
 * Delay component of mixer
 * @param {object} props 
 * @param {object} fx from mixer component
 * @param {function} OnChange handler to set FX from mixer component  
 * 
 * @returns JSX for Delay section of mixer
 */
const Delay = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="delayContainer">
            <OverlayTrigger 
                placement="top"
                delay={{show: 100, hide: 4000}}
                overlay={
                    <Tooltip id="tooltip-top" {...props}>
                        Think of the phenomenon known as a "echo", when recreated artificially in the studio it is known as "Delay".
                    </Tooltip>
                }    
            >
            <p id="delayP">Delay</p>
            </OverlayTrigger>
            <div className="delaySliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Time will set the frequency at which the time between each distinct repeat "sound" and the next
                        </Tooltip>
                    }    
                >
                <label className="delayLabel" htmlFor="delay.time">Time</label>
                </OverlayTrigger>
                <input
                    id="delay.time"
                    name="delay.time"
                    className="yellowFaders"
                    type="range"
                    min="0"
                    max="1"
                    step=".01"
                    value={fx.delay.time}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            If you adjust your song delay with a delay time of 200 ms, you would hear that same song 200 ms later. Delay times are usually either in ms or beat divisions
                        </Tooltip>
                    }    
                >
                <p className="delayLabel2">{fx.delay.time * 1000}ms</p>
                </OverlayTrigger>
            </div>
            <div className="delaySliderContainer">
            <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Feedback is how much of the signal is fed back through the effect, creating more echoes
                        </Tooltip>
                    }    
                >
                <label htmlFor="delay.feedback">Feedback</label>
                </OverlayTrigger>
                <input
                    id="delay.feedback"
                    name="delay.feedback"
                    className="yellowFaders"
                    type="range"
                    min="0"
                    max="1"
                    step=".05"
                    value={fx.delay.feedback}
                    onChange={handleSetFx}
                />
               <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            At 100% feedback, the signal will continue echoing forever, getting louder over time, until the feedback loop turns it into noise. If you want the sound to die out faster, keep the feedback lower.
                        </Tooltip>
                    }       
                >
                <p>{(fx.delay.feedback * 100).toFixed(0)}%</p>
                </OverlayTrigger>
            </div>
            <div className="delaySliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Dry is ONLY the volume of initial sound
                        </Tooltip>
                    }    
                    
                >
                <label htmlFor="delay.dry">Dry</label>
                </OverlayTrigger>
                <input
                    id="delay.dry"
                    name="delay.dry"
                    type="range"
                    className="yellowFaders"
                    min="0"
                    max="1"
                    step=".05"
                    value={fx.delay.dry}
                    onChange={handleSetFx}
                />
               <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            If its 100% dry, you would hear no echoes.
                        </Tooltip>
                    }    
                    
                >
                <p>{(fx.delay.dry * 100).toFixed(0)}%</p>
                </OverlayTrigger>
            </div>
            <div className="delaySliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Wet is the volume of each repeat
                        </Tooltip>
                    }    
                    
                >
                <label htmlFor="delay.wet">Wet</label>
                </OverlayTrigger>
                <input
                    id="delay.wet" 
                    name="delay.wet" 
                    className="yellowFaders"
                    type="range"
                    min="0"
                    max="1"
                    step=".05"
                    value={fx.delay.wet}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            If its on 100% wet, you'll only hear the repeats.
                        </Tooltip>
                    }    
                >
                <p>{(fx.delay.wet * 100).toFixed(0)}%</p>
                </OverlayTrigger>
            </div>
        </div>
    );
};

export { Delay };
