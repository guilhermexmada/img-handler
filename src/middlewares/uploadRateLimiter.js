import rateLimit from "express-rate-limit"

const uploadLimiter = rateLimit({ 

    windowMs : 16 * 60 * 1000, 
    max : 20, 

    message: {
        success: false,
        error: 'Muitos uploads. Tente novamente mais tarde.'
    }
})

export default uploadLimiter