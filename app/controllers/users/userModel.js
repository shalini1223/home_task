const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
     address: { type: String }, 
     city: { type: String },
      state: { type: String }, 
      country: { type: String }, 
      zipcode: { type: String }, 
      match: {type: Boolean, default:false},
      distance:{type:Number},
      locationPoint: { 
         type: {  
             type: String, 
           enum: ["Point",'Polygon'], 
        default:'Point'
     },  
           coordinates: [],
              },
 radius: { type: Number },
  userId: { type: Schema.ObjectId, ref: "users" },
},{
    versionKey:false,
    timestamps:true,
});
coordinateSchema.index({ locationPoint: "2dsphere" });

const userSchema = new Schema( 
    {
          email: { type: String, index: true }, 
     password: { type: String }, 
      accessToken: { type: String },  
     otp: { type: Number }, 
      firstName: { type: String }, 
       lastName: { type: String }, 
        profilePicture: { type: String }, 
     locationId: {type:[mongoose.Schema.Types.ObjectId],ref:'coordinates'},
             phoneNo: { type: Number },  
             countryCode: { type: String }, 
              businessName: { type: String },  
              businessDescription: { type: String },  
              businessImage: [String],
                fcmToken: { type: String },  
                token: { type: String, default: "", index: true }, 
                   role: { type: Number, default: 2 }, // 1.Admin, 2.user, 3. contractor  
                   status: { type: Number, default: 2 }, // 1. Active, 2. Inactive, 3. deactivated 
                    isVerified: { type: Number, default: 1 }, // 1. verified, 2. Not verified  
                    loginType: { type: Number, default: 1 }, // 1.local 2. Google 3. FaceBook 4.biometric 
                     socialAccId: { type: String, default: "" }, 
                      biometricId: { type: String },  
                      deactivateReason: { type: String },  
                      expireAt: { type: Date },  },

                          {  versionKey: false,  timestamps: true, });
                          userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
                          exports.coordinates=mongoose.model('coordinates', coordinateSchema);
                          exports.users=mongoose.model('users',userSchema);
                          
