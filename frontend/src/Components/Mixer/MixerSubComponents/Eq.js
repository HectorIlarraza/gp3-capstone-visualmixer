import React from "react";
import "../../../Styles/mixerSubComponentStyles/eq.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

/**
 * EQ component of mixer
 * @param {object} props 
 * @param {object} fx from mixer component
 * @param {function} OnChange handler to set FX from mixer component  
 * 
 * @returns JSX for EQ section of mixer
 */
const Eq = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="eqContainer">
            <div id="eqBand1" className="eqBand">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 500, hide: 100}}
                    overlay={
                        <Tooltip className="tooltip-top" id="eq1_gain_id">
                            EQ (or equalization) in music is the process of changing the balance of different frequency components in an audio signal.
                            These Five columns represent "Gain", gain determines the amount of boost or cut you apply with your EQ. It’s measured in dB. 
                            Positive gain values indicate a boost, while negative ones make it a cut.
                        </Tooltip>
                    }    
                >
                <label htmlFor="eq.band1.gain" className="eqGainLabel">
                    {fx.eq.band1.gain}db
                </label>
                </OverlayTrigger>
                <input
                    id="eq.band1.gain"
                    name="eq.band1.gain"
                    className="eqGain orangeFader"
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={fx.eq.band1.gain}
                    onChange={handleSetFx}
                />
                <div className="eqFrequency">
                <OverlayTrigger 
                    placement="top"
                    delay={{show: 500, hide: 100}}
                    overlay={
                        <Tooltip className="tooltip-top" id="eq1_freq_id">
                            Our ears can detect a huge range of frequencies—roughly 20 Hz to 20 kHz. 
                            Each element of your mix has energy in different parts of that range.
                            Example: 20hz-40hz = Deep Bass, 40hz-80hz = Low Bass or 2.4k-5k = Presence Range and 5k-10k = High End
                        </Tooltip>
                    }    
                >
                <label htmlFor="eq.band1.frequency">
                    {fx.eq.band1.frequency}hz
                </label>
                </OverlayTrigger>
                    <input
                        id="eq.band1.frequency"
                        name="eq.band1.frequency"
                        className="orangeFader-no-thumb"
                        type="range"
                        min="20"
                        max="500"
                        step="10"
                        value={fx.eq.band1.frequency}
                        onChange={handleSetFx}
                    />
                </div>
            </div>
            <div id="eqBand2" className="eqBand">                
                <label htmlFor="eq.band2.gain" className="eqGainLabel">
                    {fx.eq.band2.gain}db
                </label>
                <input
                    id="eq.band2.gain"
                    name="eq.band2.gain"
                    className="eqGain orangeFader"
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={fx.eq.band2.gain}
                    onChange={handleSetFx}
                />
                <div className="eqFrequency">
                <label htmlFor="eq.band2.frequency">
                    {fx.eq.band2.frequency}hz
                </label>
                    <input
                        id="eq.band2.frequency"
                        className="orangeFader-no-thumb"
                        name="eq.band2.frequency"
                        type="range"
                        min="100"
                        max="700"
                        step="10"
                        value={fx.eq.band2.frequency}
                        onChange={handleSetFx}
                    />
                </div>
            </div>
            <div id="eqBand3" className="eqBand">
                <label htmlFor="eq.band3.gain" className="eqGainLabel">
                    {fx.eq.band3.gain}db
                </label>
                <input
                    id="eq.band3.gain"
                    name="eq.band3.gain"
                    className="eqGain orangeFader"
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={fx.eq.band3.gain}
                    onChange={handleSetFx}
                />
                <div className="eqFrequency">
                    <label htmlFor="eq.band3.frequency">
                        {fx.eq.band3.frequency}hz
                    </label>
                    <input
                        id="eq.band3.frequency"
                        className="orangeFader-no-thumb"
                        name="eq.band3.frequency"
                        type="range"
                        min="600"
                        max="1500"
                        step="10"
                        value={fx.eq.band3.frequency}
                        onChange={handleSetFx}
                    />
                </div>
            </div>
            <div id="eqBand4" className="eqBand">
                <label htmlFor="eq.band4.gain" className="eqGainLabel">
                    {fx.eq.band4.gain}db
                </label>                    
                <input
                    id="eq.band4.gain"
                    name="eq.band4.gain"
                    className="eqGain orangeFader"
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={fx.eq.band4.gain}
                    onChange={handleSetFx}
                />
                <div className="eqFrequency">
                    <label htmlFor="eq.band4.frequency">
                        {fx.eq.band4.frequency}hz
                    </label>                    
                    <input
                        id="eq.band4.frequency"
                        className="orangeFader-no-thumb"
                        name="eq.band4.frequency"
                        type="range"
                        min="1500"
                        max="5000"
                        step="10"
                        value={fx.eq.band4.frequency}
                        onChange={handleSetFx}
                    />
                </div>
            </div>
            <div id="eqBand5" className="eqBand">
                <label htmlFor="eq.band5.gain" className="eqGainLabel">
                    {fx.eq.band5.gain}db
                </label>                    
                <input
                    id="eq.band5.gain"
                    name="eq.band5.gain"
                    className="eqGain orangeFader"
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={fx.eq.band5.gain}
                    onChange={handleSetFx}
                />
                <div className="eqFrequency">
                    <label htmlFor="eq.band5.frequency">
                        {fx.eq.band5.frequency}hz
                    </label>                    
                    <input
                        id="eq.band5.frequency"
                        className="orangeFader-no-thumb"
                        name="eq.band5.frequency"
                        type="range"
                        min="4000"
                        max="10000"
                        step="10"
                        value={fx.eq.band5.frequency}
                        onChange={handleSetFx}
                    />
                </div>
            </div>
        </div>
    );
};

export { Eq };
