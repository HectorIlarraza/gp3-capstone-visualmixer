import React from 'react'

export const Scores = () => {
    /* 
    SELECT 
	effects.effects_id,
	effects.effects_data,
	effects.totalvotes,
	audio.date_created,
	audio.audio_id,
	audio.audio_key,
	audio.artist,
	audio.title,
	users.username 
    FROM effects JOIN audio on effects.audio = audio.audio_id JOIN users on effects.user_id = users.user_id;


    */

    return <div>Scores</div>;
}
