import React from "react";
import "../../../Styles/mixerSubComponentStyles/playSpeed.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

/**
 * Play Speed component of mixer
 * @param {object} props 
 * @param {object} fx from mixer component
 * @param {function} OnChange handler to set FX from mixer component  
 * 
 * @returns JSX for Play Speed section of mixer
 */
const PlaySpeed = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="playSpeedContainer">
            <div className="playSpeedSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Filler text for Speed asdfsadfsadfasdfs
                        </Tooltip>
                    }    
                >
                <label className="playSpeedLabel" htmlFor="speed.rate">
                    Speed
                </label>
                </OverlayTrigger>
                <input
                    id="speed.rate"
                    name="speed.rate"
                    className="purpleFaders"
                    type="range"
                    min=".1"
                    max="4"
                    step=".03" 
                    value={fx.speed.rate}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Filler text for speed adjust asdfsadfsadfasdfs
                        </Tooltip>
                    }    
                >
                <p className="playSpeedLabel2">{fx.speed.rate}</p>
                </OverlayTrigger>
            </div>
            <div className="playSpeedSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Filler text for Detune asdfsadfsadfasdfs
                        </Tooltip>
                    }    
                >
                <label className="playSpeedLabel" htmlFor="speed.detune">
                    Detune
                </label>
                </OverlayTrigger>
                <input
                    id="speed.detune"
                    name="speed.detune"
                    className="purpleFaders"
                    type="range"
                    min="-2400"
                    max="2400"
                    step="100"
                    value={fx.speed.detune}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Filler text for detune adjust asdfsadfsadfasdfs
                        </Tooltip>
                    }    
                >
                <p id="playSpeedDetuneLabel">{fx.speed.detune} cents</p>
                </OverlayTrigger>
            </div>
        </div>
    );
};

export { PlaySpeed };
