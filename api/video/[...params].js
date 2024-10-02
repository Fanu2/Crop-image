import ffmpeg from 'fluent-ffmpeg';

export default function handler(req, res) {
    const { params } = req.query;
    const [action, ...rest] = params;

    if (action === 'trim') {
        const { start, duration } = req.query; // e.g., ?start=00:00:10&duration=00:00:05
        const inputPath = `./public/videos/${rest[0]}`;
        const outputPath = `./public/videos/trimmed_${rest[0]}`;

        ffmpeg(inputPath)
            .setStartTime(start)
            .setDuration(duration)
            .output(outputPath)
            .on('end', () => {
                res.status(200).send('Video trimmed successfully');
            })
            .on('error', (err) => {
                res.status(500).send('Error: ' + err.message);
            })
            .run();
    } else {
        res.status(404).send('Not Found');
    }
}
