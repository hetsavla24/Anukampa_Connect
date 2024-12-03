import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  ngo_ID: {
    type: String,
    required: true,
  },
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


  // TEST

  // {
  //   "NGO_name": "Animal Welfare Society",
  //   "registration_number": "AWS12345",
  //   "year_of_establishment": 2010,
  //   "primary_phone_number": "9876543210",
  //   "emergency_helpline_number": "1122334455",
  //   "email_address": "contact@aws.org",
  //   "alternate_contact_number": "9988776655",
  //   "username": "animalwelfare",
  //   "password": "securePassword123",
  //   "confirm_password": "securePassword123",
  //   "address": {
  //     "street": "123 Green Lane",
  //     "city": "Mumbai",
  //     "state": "Maharashtra",
  //     "postal_code": "400001"
  //   },
  //   "service_area": "Mumbai Metropolitan Region",
  //   "geographical_coordinates": {
  //     "latitude": 19.076,
  //     "longitude": 72.8777
  //   },
  //   "services_provided": {
  //     "ambulance_service_availability": true,
  //     "animal_shelter": true,
  //     "veterinary_services": true,
  //     "specialized_services": false
  //   },
  //   "resource_capacity": {
  //     "number_of_ambulances": 5,
  //     "veterinary_staff": 10,
  //     "shelter_capacity": 50
  //   },
  //   "operating_hours": {
  //     "regular_hours": "9 AM - 6 PM",
  //     "emergency_hours": "24/7"
  //   },
  //   "point_of_contact": {
  //     "contact_person_name": "John Doe",
  //     "role": "Director",
  //     "direct_contact_number": "9876543211",
  //     "alternative_contact": "9988776644"
  //   },
  //   "social_media": {
  //     "website_url": "https://www.aws.org",
  //     "facebook": "https://facebook.com/aws",
  //     "twitter": "https://twitter.com/aws",
  //     "instagram": "https://instagram.com/aws"
  //   },
  //   "cases": {
  //     "accepted_cases": 120,
  //     "declined_cases": 15
  //   }
  // } 
  