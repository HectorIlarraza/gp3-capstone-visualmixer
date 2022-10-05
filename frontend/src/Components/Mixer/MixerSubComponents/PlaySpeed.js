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
                    delay={{show: 500, hide: 100}}
                    overlay={
                        <Tooltip className="tooltip-top" id="speed_id">
                            Speed is the process of changing the speed or duration of a song.
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
                    delay={{show: 500, hide: 100}}
                    overlay={
                        <Tooltip className="tooltip-top" id="speed_id">
                            Adjusting the speed to slow down the song to increase the duration, lowers the pitch creating the Chopped effect. Speeding it up for a shorter duration also raises the pitch creating the Chipmunk effect.
                        </Tooltip>
                    }    
                >
                <p className="playSpeedLabel2">{fx.speed.rate}</p>
                </OverlayTrigger>
            </div>
            <div className="playSpeedSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 500, hide: 100}}
                    overlay={
                        <Tooltip className="tooltip-top" id="detune_id">
                            Detune is to intentionally lower or raise the pitch produced by a musical instrument. Often done to produce sounds not normally possible.
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
                    delay={{show: 500, hide: 100}}
                    overlay={
                        <Tooltip className="tooltip-top" id="detune_id">
                            Detune is measured in cents, By specifying a detune of 1200, you move up an octave. Specifying a detune of −1200 moves you down an octave.
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
