import mongoose from "mongoose";
import { initCompiler } from "sass";

const rescueSchema = new mongoose.Schema({
    incident_ID: { type: String, required: true, unique: true }, // Unique identifier for each incident
    rescue_ID: { type: String, required: true, unique: true }, // Unique identifier for each rescue
    userID: { type: String, required: true }, // Links the rescue to the user who reported it
    animalType: { type: String, required: true }, // Type of animal (e.g., Dog, Cat, Cow)
    injuryDetails: { type: String, required: true }, // Description or severity of injury
    coordinates: {
        lat: { type: Number, required: true }, // Latitude of rescue location
        long: { type: Number, required: true }, // Longitude of rescue location
    },
    timestamp: { type: Date, default: Date.now }, // When the rescue was reported
    status: {
        type: String,
        enum: ["pending", "in-progress", "resolved", "cancelled"], // Status of rescue
        default: "pending",
    },
    responderInfo: {
        volunteerID: { type: String, default: null }, // ID of responding volunteer
        ngoId: { type: String, default: null }, // ID of responding NGO
        responderName: { type: String, default: null }, // Name of responder
        contactNumber: { type: String, default: null }, // Contact info for responder
    },
    additionalInfo: { type: String, default: "" }, // Any extra details about the rescue
    media: {
        images: [{ type: String }], // Array of image URLs uploaded by the user
        videos: [{ type: String }], // Array of video URLs if applicable
    },
    firstAidProvided: {
        type: Boolean,
        default: false, // Whether first aid instructions were provided
    },
    resolvedAt: { type: Date, default: null }, // Timestamp when the rescue was resolved
    createdAt: { type: Date, default: Date.now }, // Automatically record creation time
});

const RESCUE = mongoose.model("Rescue", rescueSchema);

export default RESCUE;
