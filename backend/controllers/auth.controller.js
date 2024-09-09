import express from "express";
import NGO from "../models/NGO.model.js";
import bcrypt from "bcryptjs";



const router = express.Router();

// export const signup = (req,res) => {

//  router.post('/NGO-Signup',ngo_signup);
//  router.post('/volunteer',volunteer_signup);
// }
export const ngo_signup = async (req,res) =>{
   
     try {
        const {
            NGO_name,
            registration_number,
            year_of_establishment,
            primary_phone_number,
            emergency_helpline_number,
            email_address,
            alternate_contact_number,
            username,
            password,
            confirm_password,
            address: {
              street,
              city,
              state,
              postal_code
            },
            service_area,
            geographical_coordinates: {
              latitude,
              longitude
            },
            services_provided: {
              ambulance_service_availability,
              animal_shelter,
              veterinary_services,
              specialized_services
            },
            resource_capacity: {
              number_of_ambulances,
              veterinary_staff,
              shelter_capacity
            },
            operating_hours: {
              regular_hours,
              emergency_hours
            },
            point_of_contact: {
              contact_person_name,
              role,
              direct_contact_number,
              alternative_contact
            },
            social_media: {
              website_url,
              facebook,
              twitter,
              instagram
            },
            cases: {
                accepted_cases,
                declined_cases
            }
          } = req.body;

        if(password !== confirm_password) {
            return res.status(400).json({error:"Passwords dotn match"})
        }

        const ngo = await NGO.findOne({ geographical_coordinates: {
                latitude,
                longitude
            }});

        if(ngo) {
            return res.status(400).json({error:"NGO at this location already exists"})
        }
 
        //HASH password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newNGO = new NGO({
            NGO_name,
            registration_number,
            year_of_establishment,
            primary_phone_number,
            emergency_helpline_number,
            email_address,
            alternate_contact_number,
            username,
            password:hashedPassword,
            address: {
              street,
              city,
              state,
              postal_code
            },
            service_area,
            geographical_coordinates: {
              latitude,
              longitude
            },
            services_provided: {
              ambulance_service_availability,
              animal_shelter,
              veterinary_services,
              specialized_services
            },
            resource_capacity: {
              number_of_ambulances,
              veterinary_staff,
              shelter_capacity
            },
            operating_hours: {
              regular_hours,
              emergency_hours
            },
            point_of_contact: {
              contact_person_name,
              role,
              direct_contact_number,
              alternative_contact
            },
            social_media: {
              website_url,
              facebook,
              twitter,
              instagram
            },
            cases: {
                accepted_cases,
                declined_cases
            }
        })

        await newNGO.save();

        res.status(201).json({
            _id: newNGO._id,
            ngoName: newNGO.NGO_name,
            username: newNGO.username,
            latitude: newNGO.geographical_coordinates.latitude,
            longitude: newNGO.geographical_coordinates.longitude
        })

          } catch (error) {
            console.log("Error in NGO signup controller",error.message);
            
            res.status(500).json({error:"Internal Server Error"})
        
    }

};

export const volunteer_signup = (req,res) => {
    res.send(" volunteer");

};

export const login = (req,res) => {
    console.log("login user");
};


export const logout = (req,res) => {
    console.log("logout user");
    
};
