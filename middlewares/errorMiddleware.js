function errorMiddleware(err, req, res, next) {
    console.error("Error:", err.message)

    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Erro interno do servidor"
    })
}

export default errorMiddleware