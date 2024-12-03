import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  incident_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the User collection
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  injury_type: {
    type: String,
    required: true, // Value comes from ML model
  },
  first_aid_provided: {
    type: String,
    required: true, // Describes the first aid as determined ML model
  },
  responder_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "responder_type", // References Volunteer or NGO dynamically
  },
  responder_type: {
    type: String,
    enum: ["NGO", "Volunteer"], // Specify the type of responder
  },
  status: {
    type: String,
    enum: ["Reported", "Dispatched", "Resolved"],
    default: "Reported",
  },
  severity_score: {
    type: Number,
    default: 0, // Optional field for prioritization
  },
  timestamp: {
    reported_at: {
      type: Date,
      default: Date.now,
    },
    dispatched_at: {
      type: Date,
    },
    resolved_at: {
      type: Date,
    },
  },
});

const INCIDENT = mongoose.model("Incident", incidentSchema);

export default INCIDENT;
