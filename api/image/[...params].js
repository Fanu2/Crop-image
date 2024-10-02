import sharp from 'sharp';

export default async function handler(req, res) {
    const { params } = req.query;
    const [action, ...rest] = params;

    // Example image processing based on action
    if (action === 'resize') {
        const { width, height } = req.query; // e.g., ?width=300&height=200
        const imageBuffer = await sharp(`./public/images/${rest[0]}`)
            .resize(parseInt(width), parseInt(height))
            .toBuffer();
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(imageBuffer);
    }

    res.status(404).send('Not Found');
}
