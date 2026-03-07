import rateLimit from "express-rate-limit"

const uploadLimiter = rateLimit({ // limita quant. de uploads num período por IP

    windowMs : 16 * 60 * 1000, // dentro de 15 minutos
    max : 20, // máximo de 20 uploads

    message: {
        success: false,
        error: 'Muitos uploads. Tente novamente mais tarde.'
    }
})

export default uploadLimiter