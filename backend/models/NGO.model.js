import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
    NGO_name: {
      type: String,
      required: true,
    },
    registration_number: {
      type: String,
      required: true,
      unique: true
    },
    year_of_establishment: {
      type: Number,
      required: true,
    },
    primary_phone_number: {
      type: String,
      required: true,
    },
    emergency_helpline_number: {
      type: String,
      required: true,
    },
    email_address: {
      type: String,
      required: true,
    },
    alternate_contact_number: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
    },
    service_area: {
      type: String,
      required: true,
    },
    geographical_coordinates: {
      latitude: {
        type: Number,
        required: true,
        unique: true
      },
      longitude: {
        type: Number,
        required: true,
        unique: true
      },
    },
    services_provided: {
      ambulance_service_availability: {
        type: Boolean,
        required: true,
      },
      animal_shelter: {
        type: Boolean,
        required: true,
      },
      veterinary_services: {
        type: Boolean,
        required: true,
      },
      specialized_services: {
        type: Boolean,
        required: true,
      },
    },
    resource_capacity: {
      number_of_ambulances: {
        type: Number,
        required: true,
      },
      veterinary_staff: {
        type: Number,
        required: true,
      },
      shelter_capacity: {
        type: Number,
        required: true,
      },
    },
    operating_hours: {
      regular_hours: {
        type: String,
        required: true,
      },
      emergency_hours: {
        type: String,
        required: true,
      },
    },
    point_of_contact: {
      contact_person_name: {
        type: String,
        required: true,
        default: ""
      },
      role: {
        type: String,
        required: true,
        default: ""
      },
      direct_contact_number: {
        type: String,
        required: true,
        default: ""
      },
      alternative_contact: {
        type: String,
        required: true,
        default: ""
      },
    },
    social_media: {
      website_url: {
        type: String,
        required: false,
        default: ""
      },
      facebook: {
        type: String,
        required: false,
        default: ""
      },
      twitter: {
        type: String,
        required: false,
        default: ""
      },
      instagram: {
        type: String,
        required: false,
        default: ""
      },
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
  
  const NGO = mongoose.model('NGO', ngoSchema);

  export default NGO;