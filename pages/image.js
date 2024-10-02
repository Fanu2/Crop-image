// pages/image.js
import Image from 'next/image';

export default function ImagePage() {
    return (
        <div>
            <h1>Responsive Images</h1>
            <Image
                src="/path/to/image.jpg" // Replace with your image path
                alt="Image Description"
                width={500} // Specify the width
                height={300} // Specify the height
                layout="responsive" // Responsive layout
            />
        </div>
    );
}
