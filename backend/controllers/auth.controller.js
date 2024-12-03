import express from "express";
import NGO from "../models/NGO.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import VOLUNTEER from "../models/VOLUNTEER.model.js";
import crypto from 'crypto'; 



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
 
        const ngo_ID = crypto.randomBytes(8).toString('hex');
        //HASH password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newNGO = new NGO({
            ngo_ID,
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

        if(newNGO){

          
            //Generate JWT Token
            await generateTokenAndSetCookie(newNGO._id, res);
            await newNGO.save();
            res.status(201).json({
                ngo_ID: newNGO.ngo_ID,              
                _id: newNGO._id,
                ngoName: newNGO.NGO_name,
                username: newNGO.username,
                latitude: newNGO.geographical_coordinates.latitude,
                longitude: newNGO.geographical_coordinates.longitude
            });
        } else{
            res.status(400).json({ error: "Invalid NGO data"});
        }

          } catch (error) {
            console.log("Error in NGO signup controller",error.message);
            
            res.status(500).json({error:"Internal Server Error"})
        
    }

};

export const volunteer_signup = async (req,res) => {
    try {
      const {
        personal_info: {
          fullname,
          date_of_birth,
          gender
        },
          username,
          password,
          confirm_password,
        contact_info: {
          phone_number,
          email_address,
          alternate_contact_number
        },
        location_info:{
          city,
          state,
          postal_code,
        },
        availability: {
          days_available,
          hours_available,
          emergency_availability,
        },
        areas_of_interest,
        date_joined,
        cases: {
            accepted_cases,
            declined_cases
          }
      } = req.body;

      if(password !== confirm_password) {
        return res.status(400).json({error:"Passwords dont match"})
    }

    // const volunteer = await VOLUNTEER.findOne({contact_info:{phone_number},personal_info:{fullname,date_of_birth}});
    const volunteer = await VOLUNTEER.findOne({ 'contact_info.phone_number': phone_number, 'personal_info.fullname': fullname, 'personal_info.date_of_birth': date_of_birth });

    if(volunteer) {
        return res.status(400).json({error:"ALready have an existing account!!"})
    }

    const volunteer_ID = crypto.randomBytes(8).toString('hex');
    //HASH password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newvolunteer = new VOLUNTEER({
      volunteer_ID,
      personal_info: {
        fullname,
        date_of_birth,
        gender
      },
        username,
        password:hashedPassword,
      contact_info: {
        phone_number,
        email_address,
        alternate_contact_number
      },
      location_info,
        city,
        state,
        postal_code,
      availability: {
        days_available,
        hours_available,
        emergency_availability,
      },
      areas_of_interest,
      date_joined,
      cases: {
          accepted_cases,
          declined_cases
        }
    })

    if(newvolunteer){
      //Generate JWT Token
      await generateTokenAndSetCookie(newvolunteer._id, res);
      await newvolunteer.save();

      res.status(201).json({
          volunteer_ID: newvolunteer.volunteer_ID,        
          _id: newvolunteer._id,
          personal_info: newvolunteer.personal_info,
          username: newvolunteer.username,
          gender: newvolunteer.gender,
          password: newvolunteer.hashedPassword
      });
  } else{
      res.status(400).json({ error: "Invalid volunteer data"});
  }

    
    } catch (error) {
      console.log("Error in volunteer signup controller",error.message);
            
      res.status(500).json({error:"Internal Server Error"})
    }

};

export const ngo_login = async (req,res) => {
    try {
        const {NGO_name,registration_number,username,password} = req.body;
        const ngo = await NGO.findOne({NGO_name,registration_number,username});
        const isPasswordCorrect = await bcrypt.compare(password, ngo?.password || "");

        if(!ngo || !isPasswordCorrect) {
            return res.status(400).json({error:"Invalid Username or Password"});
        }

        generateTokenAndSetCookie(ngo._id, res);

        res.status(201).json({
            ngo_ID:ngo.ngo_ID,
            _id: ngo._id,
            ngoName: ngo.NGO_name,
            username: ngo.username,
            latitude: ngo.geographical_coordinates.latitude,
            longitude: ngo.geographical_coordinates.longitude
        });
        
    } catch (error) {
        console.log("Error in ngo login controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
    
};

export const volunteer_login = async (req,res) => {
try {
  const {phone_number,username,password} = req.body;
        const volunteer = await VOLUNTEER.findOne({'contact_info.phone_number': phone_number,username});
        const isPasswordCorrect = await bcrypt.compare(password, volunteer?.password || "");

        if(!volunteer || !isPasswordCorrect) {
            return res.status(400).json({error:"Invalid Username or Password"});
        }

        generateTokenAndSetCookie(volunteer._id, res);

        res.status(201).json({
          volunteer_ID:volunteer.volunteer_ID,
          _id:volunteer._id,
          username:volunteer.username,
          phone_number:volunteer.contact_info.phone_number
        });
  
} catch (error) {
  console.log("Error in volunteer login controller",error.message);
  res.status(500).json({error:"Internal Server Error"});
}
};

export const logout = (req,res) => {
try {
  res.cookie("jwt","",{maxAge: 0});
  res.status(200).json({message: "Logged out Successfully!"});
} catch (error) {
  console.log("Error in logout controller",error.message);
  res.status(500).json({error:"Internal Server Error"});
}    
};
