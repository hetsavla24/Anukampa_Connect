import express from "express";
import mongoose from "mongoose";
import USER from "../models/USER.model.js"; 
import INCIDENT from "../models/INCIDENT.model.js"; 
import crypto from "crypto";

export const report = async (req, res) => {
  try {
    let user_ID = req.cookies?.user_ID; //check for users
    let user;
    

//Add frontend localStorage call ::


    if (user_ID) {
      user = await USER.findOne({ user_ID });//find with the correct id(basically its  double check)
      //(we check localStorage of frontend ans check the userID both at localStorage and cookie for double auth)

      if (!user) {
        user_ID = crypto.randomUUID();
        user = new USER({
          user_ID,
          lastActive: Date.now(),
          createdAt: Date.now(),
          rescues: [],
          contactInfo: {},
        });
        await user.save();
      } else {
        user.lastActive = Date.now();
        await user.save();
      }
    } else {
      user_ID = crypto.randomUUID();
      user = new USER({
        user_ID,
        lastActive: Date.now(),
        createdAt: Date.now(),
        rescues: [],
        contactInfo: {},
      });
      await user.save();

      res.cookie("user_ID", user_ID, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        // maxAge:  1 * 1 * 1000, //1 minute 1 second
        maxAge: 30 * 24 * 60 * 60 * 1000, //  30 days check
      });
    }

// Incident Create

// const { location, status } = req.body; // Location and status from frontend
const location = {
    latitude: Math.random() * 180 - 90, //frontend
    longitude: Math.random() * 360 - 180, 
  };
const status = "Reported";
const injury_type = "Fracture"; // ml model
const first_aid_provided = "Apply splint and keep stable"; // ml model 


// Step 2: Generate incident ID
const incident_id = crypto.randomUUID();

const responder_id = null; //add function remaining
const responder_type = null; //add function remaining


const newIncident = new INCIDENT({
  incident_id,
  user_id: user._id,
  location: {
    latitude: location.latitude,
    longitude: location.longitude,
  },
  injury_type,
  first_aid_provided,
  responder_id, // to be added by responder function
  responder_type, // to be added by responder function
  status,
});

await newIncident.save();

    res.status(201).json({
      message: "User created successfully. Incident reported successfully",
      user,
      newIncident,
    });
  } catch (error) {
    console.error("Error reporting incident:", error);
    res.status(500).json({
      message: "An error occurred while processing the user.",
      error: error.message,
    });
  }
};
