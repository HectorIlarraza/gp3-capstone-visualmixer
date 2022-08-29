import React from "react";
import "../../../Styles/mixerSubComponentStyles/compressor.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

/**
 * Compressor component of mixer
 * @param {object} props 
 * @param {object} fx from mixer component
 * @param {function} OnChange handler to set FX from mixer component  
 * 
 * @returns JSX for Compressor section of mixer
 */
const Compressor = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="compressorContainer">
            <OverlayTrigger 
                placement="top"
                delay={{show: 100, hide: 4000}}
                overlay={
                    <Tooltip id="tooltip-top" {...props}>
                        Compression is the process of lessening the dynamic range between the loudest and quietest parts of an audio signal.
                    </Tooltip>
                }    
            >
            <p id="compressorP">Compressor</p>
            </OverlayTrigger>
            <div className="compressorSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                           The threshold relates to loudness, sets the level at which the compression effect kicks in.
                        </Tooltip>
                    }    
                >
                <label className="compressorLabel" htmlFor="compressor.threshold">
                    Threshold
                </label>
                </OverlayTrigger>
                <input
                    id="compressor.threshold"
                    name="compressor.threshhold"
                    className="blueFaders"
                    type="range"
                    min="-60"
                    max="0"
                    step="1"
                    value={fx.compressor.threshold}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            It is typically expressed in decibels "dB"
                        </Tooltip>
                    }    
                >
                <p className="compressorLabel2">
                    {fx.compressor.threshold}
                </p>    
                </OverlayTrigger>    
            </div>
            <div className="compressorSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                           Ratio determines how much compression is applied. 
                        </Tooltip>
                    }    
                >
                <label htmlFor="compressor.ratio">Ratio</label>
                </OverlayTrigger>
                <input
                    id="compressor.ratio"
                    name="compressor.ratio"
                    className="blueFaders"
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={fx.compressor.ratio}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                           With a 2:1 ratio, signals going 2db over the threshold are reduced to 1db
                        </Tooltip>
                    }    
                >
                <p className="compressorLabel2">
                    1:{fx.compressor.ratio}
                </p>
                </OverlayTrigger>    
            </div>
            <div className="compressorSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Attack is how quickly the compressor will begin to act once the singal passes the threshold
                        </Tooltip>
                    }    
                >    
                <label htmlFor="compressor.attack">Attack</label>
                </OverlayTrigger>
                <input
                    id="compressor.attack"
                    name="compressor.attack"
                    className="blueFaders"
                    type="range"
                    min="0"
                    max="1"
                    step=".001"
                    value={fx.compressor.attack}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Uses milliseconds "ms" as amount to measure timing, if its set to 20ms it will take 20ms for the compressor to engage
                        </Tooltip>
                    }    
                >
                <p className="compressorLabel2">
                    {fx.compressor.attack * 1000}ms
                </p>
                </OverlayTrigger>
            </div>
            <div className="compressorSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Release determines how long it takes to for compressor to return to its normal volume after dropping back below the threshold
                        </Tooltip>
                    }    
                >
                <label htmlFor="compressor.release">Release</label>
                </OverlayTrigger>
                <input
                    id="compressor.release"
                    name="compressor.release"
                    className="blueFaders"
                    type="range"
                    min="0"
                    max="1"
                    step=".001"
                    value={fx.compressor.release}
                    onChange={handleSetFx}
                />
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Similar to Attack it is also measured in "ms", if it is set to 100ms even when the sound goes below threshold, the sound will be compressed for an additional 0.1 secs 
                        </Tooltip>
                    }    
                >
                <p className="compressorLabel2">
                    {fx.compressor.release * 1000}ms
                </p>
                </OverlayTrigger>
            </div>
        </div>
    );
};

export { Compressor };