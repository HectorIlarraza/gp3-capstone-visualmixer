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
            <p id="delayP">Delay</p>
            <div className="delaySliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Filler text for Time asdfsadfsadfasdfs
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
                            Filler text for time asdfsadfsadfasdfs
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
                            Filler text for Feedback asdfsadfsadfasdfs
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
                            Filler text for feedback % asdfsadfsadfasdfs
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
                            Filler text for Dry asdfsadfsadfasdfs
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
                            Filler text for dry % asdfsadfsadfasdfs
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
                            Filler text for Wet asdfsadfsadfasdfs
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
                            Filler text for wet % asdfsadfsadfasdfs
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
