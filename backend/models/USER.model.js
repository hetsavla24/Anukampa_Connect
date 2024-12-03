import mongoose from "mongoose";

// Mongoose User model
const userSchema = new mongoose.Schema({
    user_ID: { type: String, required: true },
    name: { type: String, default: "Guest" }, 
    rescues: [
        {
            rescues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rescue" }], 
            animalType: { type: String, required: true }, 
            coordinates: {
                lat: { type: Number, required: true },
                long: { type: Number, required: true }, 
            },
            timestamp: { type: Date, default: Date.now }, 
            status: { type: String, default: "pending" },
            additionalInfo: { type: String }, 
        },
    ],
    contactInfo: {
        phone: { type: String, default: "" }, 
        email: { type: String, default: "" }, 
    },
    lastActive: { type: Date, default: Date.now }, 
    createdAt: { type: Date, default: Date.now }, 
});

const USER = mongoose.model("User", userSchema);

export default USER;


// TEST
// {
//    
//     "name": "John Doe",
//     "rescues": [
//         {
//             "rescueId": "6411c7992e8a4c945c38f82a",
//             "animalType": "Dog",
//             "coordinates": { "lat": 40.7128, "long": -74.0060 },
//             "timestamp": "2024-11-07T14:00:00Z",
//             "status": "pending",
//             "additionalInfo": "Dog with visible leg injury near the park."
//         },
//         {
//             "rescueId": "6411c7992e8a4c945c38f82b",
//             "animalType": "Cat",
//             "coordinates": { "lat": 34.0522, "long": -118.2437 },
//             "timestamp": "2024-11-06T18:30:00Z",
//             "status": "resolved",
//             "additionalInfo": "Cat found stuck in a tree, successfully rescued."
//         }
//     ],
//     "contactInfo": {
//         "phone": "123-456-7890",
//         "email": "john.doe@example.com"
//     },
//     "lastActive": "2024-11-08T10:30:00Z",
//     "createdAt": "2024-11-01T09:00:00Z"
// }
