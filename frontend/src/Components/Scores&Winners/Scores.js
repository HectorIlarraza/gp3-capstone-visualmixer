import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;

export const Scores = () => {
    const [allScores, setAllScores] = useState();

    // grab all scores from DB on component mount
    useEffect(() => {
        fetch(`${API}/effects/scores`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then (data => setAllScores(data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (allScores) {

        }
    }, [allScores]);

    return <div>{'glkjdflkg'}</div>;
};
