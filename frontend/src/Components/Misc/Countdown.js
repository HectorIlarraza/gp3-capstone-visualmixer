import { useState, useEffect } from "react";
import { secondsTillMidnight } from "../../utils/countdown.js";

export const Countdown = () => {
    let [countdown, setCountdown] = useState();

    // countdown to next song timer
    useEffect(() => {
        const countdownTimer = setInterval(() => {
            const secondsLeft = secondsTillMidnight();
            const hoursLeft = Math.floor(secondsLeft / 60 / 60);
            const minsLeft = Math.floor((secondsLeft / 60) % 60);
            const secsLeft = Math.floor(
                secondsLeft - hoursLeft * 60 * 60 - minsLeft * 60
            );
            setCountdown(
                `${hoursLeft}:${
                    minsLeft < 10 ? `0${minsLeft}` : `${minsLeft}`
                }:${secsLeft < 10 ? `0${secsLeft}` : `${secsLeft}`}`
            );
        }, 1000);
        return () => clearInterval(countdownTimer);
    }, []);

    return (
        <>
            <p>New Song in: {countdown}</p>
        </>
    );
};
