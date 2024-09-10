import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    personal_info: {
      fullname: {
        type: String,
        required: true
      },
      date_of_birth: {
        type: Date,
        required: true
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
      }
    },
    username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    contact_info: {
      phone_number: {
        type: String,
        required: true
      },
      email_address: {
        type: String,
        required: true
      },
      alternate_contact_number: {
        type: String,
        default: null
      }
    },
    location_info: {
      home_address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      postal_code: {
        type: String,
        required: true
      }
    },
    availability: {
      days_available: {
        type: [String], // Example: ['Monday', 'Wednesday', 'Friday']
        required: true
      },
      hours_available: {
        type: String, // Example: '9 AM - 5 PM'
        required: true
      },
      emergency_availability: {
        type: Boolean,
        default: false
      }
    },
    areas_of_interest: {
      type: [String], // Example: ['Animal rescue', 'Vet assistance', 'Shelter work']
      required: true
    },
    date_joined: {
      type: Date,
      default: Date.now
    },
    cases: {
        accepted_cases: {
          type: Number,
          default: 0, // Initialize with 0
        },
        declined_cases: {
          type: Number,
          default: 0, // Initialize with 0
        }
      }
  });


  const VOLUNTEER = mongoose.model('VOLUNTEER', volunteerSchema);

  export default VOLUNTEER;