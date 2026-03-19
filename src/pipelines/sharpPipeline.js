import sharp from 'sharp'

export async function sharPipeline(inputPath, outputPath, operations = {}) {
    let pipeline = sharp(inputPath)
    let format

    if (operations.resize) {
        const width = operations.resize.width
        const height = operations.resize.height
        pipeline = pipeline.resize(width, height)
    }

    if (operations.rotate) {
        const degrees = operations.rotate
        pipeline = pipeline.rotate(degrees)
    }

    if (operations.crop) {
        const dimensions = operations.crop
        pipeline = pipeline.extract(dimensions)
    }

    if (operations.format) {
        format = operations.format
        pipeline = pipeline.toFormat(format)
    } else {
         format = 'png'
    }

    if (operations.compress) {
        const quality = operations.compress.quality
        if (format === 'jpeg') {
            pipeline = pipeline.jpeg({ quality })
        }
        else if (format === 'png') {
            pipeline = pipeline.png({ quality })
        }
        else if (format === 'webp') {
            pipeline = pipeline.webp({ quality })
        }
        else {
            pipeline = pipeline.png({ quality })
        }
    }

    await pipeline.toFile(outputPath)
    return outputPath

}