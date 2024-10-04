// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploader = () => {
//     const [imageSrc, setImageSrc] = useState(null);
//     const [result, setResult] = useState([]);
//     const [error, setError] = useState('');

//     const loadImageBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = (error) => reject(error);
//         });
//     };

//     const handleUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;
    
//         const imageBase64 = await loadImageBase64(file);
//         setImageSrc(imageBase64);
        
//         console.log("Uploading image..."); // Log before the API call
//         console.log("Image Base64:", imageBase64); // Log the base64 image
    
//         try {
//             const response = await axios({
//                 method: "POST",
//                 url: "https://detect.roboflow.com/injured-animal-detector-6zzbu/3",
//                 params: {
//                     api_key: "XthyO7SGIKkaga8ZEpYl"
//                 },
//                 data: imageBase64,
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 }
//             });
    
//             console.log("API Response:", response.data); // Log the full response
    
//             const predictions = response.data.predictions || []; // Safe access to predictions
//             setResult(predictions);
//             setError('');
//         } catch (error) {
//             console.error("Error:", error);
//             setError(error.message);
//             setResult([]);
//         }
//     };
    

//     return (
//         <div>
//             <input type="file" onChange={handleUpload} accept="image/*" />
//             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//             {imageSrc && (
//                 <div style={{ position: 'relative', display: 'inline-block' }}>
//                     <img
//                         src={imageSrc}
//                         alt="Uploaded"
//                         style={{ maxWidth: '100%', height: 'auto' }}
//                     />
//                     {result.map((prediction, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 position: 'absolute',
//                                 border: '2px solid red',
//                                 left: prediction.x,
//                                 top: prediction.y,
//                                 width: prediction.width,
//                                 height: prediction.height,
//                                 pointerEvents: 'none', // Prevent interaction with the overlay
//                             }}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ImageUploader;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InjuryDetection = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [result, setResult] = useState([]);
    const [error, setError] = useState('');

    const loadImageBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const imageBase64 = await loadImageBase64(file);
        setImageSrc(imageBase64);

        console.log("Uploading image...");
        console.log("Image Base64:", imageBase64);

        try {
            const response = await axios({
                method: "POST",
                url: "https://detect.roboflow.com/injured-animal-detector-6zzbu/3",
                params: {
                    api_key: "XthyO7SGIKkaga8ZEpYl"
                },
                data: imageBase64,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            console.log("API Response:", response.data);

            const predictions = response.data.predictions || [];
            setResult(predictions);
            setError('');
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
            setResult([]);
        }
    };

    const drawBoundingBoxes = () => {
        const canvas = document.getElementById('boundingBoxCanvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set canvas dimensions to match the original image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Draw each bounding box from the predictions
            result.forEach(prediction => {
                const x = prediction.x; // x-coordinate
                const y = prediction.y; // y-coordinate
                const width = prediction.width; // width of the bounding box
                const height = prediction.height; // height of the bounding box

                // Log original coordinates
                console.log(`Original: (${x}, ${y}), Width: ${width}, Height: ${height}`);

                // Draw bounding box
                ctx.strokeStyle = 'red'; // Color of the bounding box
                ctx.lineWidth = 2; // Thickness of the bounding box
                ctx.strokeRect(x, y, width, height); // Draw the box

                // Add label
                ctx.fillStyle = 'red'; // Color of the label text
                ctx.font = '16px Arial';
                ctx.fillText(prediction.class, x, Math.max(y - 5, 10)); // Prevent label from going off the top
            });
        };
    };

    // Use useEffect to draw bounding boxes whenever predictions change
    useEffect(() => {
        if (result.length > 0) {
            drawBoundingBoxes();
        }
    }, [result]);

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {/* Only show the canvas after the predictions are made */}
            {imageSrc && (
                <canvas id="boundingBoxCanvas" style={{ display: 'block' }} />
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default InjuryDetection;






