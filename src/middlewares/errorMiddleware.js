function errorMiddleware(err, req, res, next) {
    console.error("Error:", err.message)

    if (err.code === "LIMIT_FILE_SIZE"){
        return res.status(400).json({
            success: false,
            error: "Arquivo excede limite de 5MB"
        })
    }

    if (err.isOperational){
        return res.status(err.statusCode).json({
            sucess: false,
            error: err.message
        })
    }

    res.status(err.status || 500).json({
        success: false,
        error: "Erro interno do servidor"
    })
}

export default errorMiddleware