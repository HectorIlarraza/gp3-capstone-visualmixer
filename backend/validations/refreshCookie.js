function refreshCookie(req, res, next) {
    console.log("refresh cookie");
    // console.log(res.locals.tokens);
    
    try {
        let tokens = res.locals.tokens;
        console.log(tokens.refreshToken);
    
        res.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
    
        res.status(200).json(tokens);
        
    } catch (err) {
         res.status(401).json({ error: error.message });
    }
    
}

module.exports = refreshCookie;
