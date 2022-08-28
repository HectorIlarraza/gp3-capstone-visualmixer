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
            <p id="compressorP">Compressor</p>
            <div className="compressorSliderContainer">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 100, hide: 4000}}
                    overlay={
                        <Tooltip id="tooltip-top" {...props}>
                            Filler text for Threshold asdfsadfsadfasdfs
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
                            Filler text for Attack asdfsadfsadfasdfs
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
                            Filler text for Ratio asdfsadfsadfasdfs
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
                            Filler text for Attack asdfsadfsadfasdfs
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
                            Filler text for Attack asdfsadfsadfasdfs
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
                            Filler text for Release asdfsadfsadfasdfs
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
                            Filler text for Release asdfsadfsadfasdfs
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
                            Filler text for ms asdfsadfsadfasdfs
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