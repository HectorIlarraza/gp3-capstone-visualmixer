import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../../Styles/mixer.css";
import "../../Styles/mixerSubComponentStyles/transport.css";

//MIXER SUB COMPONENTS
import { Visualizer } from "./MixerSubComponents/Visualizer";
import { Delay } from "./MixerSubComponents/Delay";
import { PlaySpeed } from "./MixerSubComponents/PlaySpeed";
import { Compressor } from "./MixerSubComponents/Compressor";
import { Eq } from "./MixerSubComponents/Eq";
import Loading from "../Loading";

const API = process.env.REACT_APP_API_URL;

const Mixer = ({
    setFx,
    fx,
    setVolume,
    volume,
    playState,
    track,
    loading,
    analyserNode,
    time,
    setTime, 
    handleSeek,
    handlePlayPause,
    playPause,
    todaysTrack
}) => {
    const navigate = useNavigate();

    /**
     * On page load checks if there are FX settings stored in local storage.
     * This is used in the case that a user has created a mix without an account or being logged in.
     */
    useEffect(() => {
        const storedFx = JSON.parse(localStorage.getItem("temp_fx"));
        if (storedFx) {
            setFx(storedFx);
            localStorage.setItem("temp_fx", null);
        }
    }, []);

    useEffect(() => {
        if (track.current) {
            setTime(prev => {
                return ({
                    ...prev,
                    duration: track.current.buffer.duration / fx.speed.rate
                })
            })
        }
    }, [fx.speed.rate]);

    /**
     * handles onChange event from all inputs in the mixer
     * dyanmically determines key based on <input> tags id property
     * ID needs to be in the format key.key OR for EQ settings key.key.key
     * (eg. id="delay.time" or id="eq.band1.gain")
     * @param {object} e
     */
    const handleSetFx = (e) => {
        const effect = e.target.id.split('.')[0];
        const param = e.target.id.split('.')[1];
        const eqParam = e.target.id.split('.').length > 2 ? e.target.id.split('.')[2] : null;

        setFx((prev) => {
            if (eqParam) {
                return {
                    ...prev,
                    [effect]: {
                        ...prev[effect],
                        [param]: {
                            ...prev.eq[param],
                            [eqParam]: e.target.value,
                        },
                    },
                };
            } else {
                return {
                    ...prev,
                    [effect]: {
                        ...prev[effect],
                        [param]: e.target.value,
                    },
                };
            }
        });
    }; 

    /**
     * handles onChange event from master volume slider in transport controls
     * changes volumes of masterOutNode which is the last node in the FX chain
     * @param {object} e event object
     */
    const setMasterVolume = (e) => setVolume(e.target.value);

    /**
     * handle onClick event from "Save Mix" button
     * Checks local storage to determine if a user is logged in
     * If logged in Check if logged in user has already created a mix for specific track
     * -----If mix already exists update that mix
     * -----If mix does not exist POST a new mix
     * If not logged in save user's mix to local storage and navigate to the REGISTER page
     */
    const handleSaveClick = async () => {
        let user = JSON.parse(localStorage.getItem("user_id"));
        console.log(user);
        if (user) {
            try {
                const data = {
                    effects: JSON.stringify(fx),
                    user_id: user,
                    audio_id: todaysTrack.audio_id,
                };
                console.log(data);
                let method;

                const existResponse = await fetch(
                    `${API}/effects/exist/${todaysTrack.audio_id}/${user}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

                const existContent = await existResponse.json();

                existContent ? (method = "PUT") : (method = "POST");

                const response = await fetch(`${API}/effects`, {
                    method: method,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const content = await response.json();

                localStorage.setItem(
                    "user_id",
                    JSON.stringify(content.user_id)
                );
                if (playState.state === "playing") track.current.stop();
                navigate("/audio");
            } catch (error) {
                console.log(error);
            }
        } else {
            localStorage.setItem("temp_fx", JSON.stringify(fx));
            if (playState.state === "playing") track.current.stop();
            navigate("/register");
        }
    };

    return (
        <>
            {/* DISPLAY LOADING PAGE UNTIL FETCH IS COMPLETE */}
            {loading ? (
                <Loading />
            ) : (
                // AFTER SONG FETCH DISPLAY MIXER / VISUALIZER 
                <div id="mainMixerContainer">
                    <Visualizer analyserNode={analyserNode.current} />
                    <div id="transportContainer">
                        <div id="transportVolumeContainer">
                            <label htmlFor="volume">Volume</label>
                            <input
                                type="range"
                                id="volume"
                                name="volume"
                                min="0"
                                max="1"
                                step=".05"
                                value={volume}
                                onChange={setMasterVolume}
                            />
                        </div>
                        <div id="transportTimeContainer">
                            {/*PRETTIER keeps multilining the first .toFixed()! */}
                            {/* prettier-ignore */}
                            <p>{`${Math.floor(time.current / 60)}:${(time.current % 60).toFixed(0) < 10 ? 
                                `0${(time.current % 60).toFixed(0)}`: 
                                (time.current % 60).toFixed(0)}`} / 
                            {`${Math.floor(time.duration / 60)}:
                            ${(time.duration % 60).toFixed(0) < 10 ? 
                                `0${(time.duration % 60).toFixed(0)}`: 
                                (time.duration % 60).toFixed(0)}`}
                            </p>
                        </div>
                        <div id="transportSeekBarContainer">
                            <input
                                className="transportSlider"
                                id="seekBar"
                                type="range"
                                min="0"
                                max={time.duration}
                                step="1"
                                value={time.current}
                                onChange={handleSeek}
                            />
                        </div>
                    </div>
                    <Delay handleSetFx={handleSetFx} fx={fx} />
                    <PlaySpeed handleSetFx={handleSetFx} fx={fx} />
                    <Compressor handleSetFx={handleSetFx} fx={fx} />
                    <div id="eqPlaySaveContainer">
                        <div id="playButtonContainer">
                            <button id="playButton" onClick={handlePlayPause}>
                                <span>
                                    {playPause ? (
                                        <i className="fa-solid fa-pause"></i>
                                    ) : (
                                        <i className="fa-solid fa-play"></i>
                                    )}
                                </span>
                            </button>
                        </div>
                        <Eq handleSetFx={handleSetFx} fx={fx} />
                        <div id="saveButtonContainer">
                            <button id="saveButton" onClick={handleSaveClick}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { Mixer };