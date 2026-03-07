function errorMiddleware(err, req, res, next) {
    console.error("Error:", err.message)

    if (err.code === "LIMIT_FILE_SIZE"){ // trata erro de arquivo muito grande
        return res.status(400).json({
            success: false,
            error: "Arquivo excede limite de 5MB"
        })
    }

    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Erro interno do servidor"
    })
}

export default errorMiddleware