const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "freelancer",
    },

    // ===========================
    // Professional Skills
    // ===========================
    skills: [
      {
        name: {
          type: String,
          required: true,
        },
        proficiency: {
          type: String,
          enum: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert",
          ],
          default: "Beginner",
        },
      },
    ],

    // ===========================
    // Profile
    // ===========================
    profileImage: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    // ===========================
    // Portfolio
    // ===========================
    portfolio: [
      {
        title: String,
        description: String,
        image: String,
        projectLink: String,
        githubLink: String,
        technologies: [String],
      },
    ],

    // ===========================
    // Certifications
    // ===========================
    certifications: [
      {
        title: String,
        organization: String,
        issueDate: Date,
        certificateUrl: String,
      },
    ],

    // ===========================
    // Work Experience
    // ===========================
    workExperience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    // ===========================
    // Experience
    // ===========================
    experience: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Availability
    // ===========================
    availability: {
      type: String,
      enum: ["Available", "Busy", "On Leave"],
      default: "Available",
    },

    // ===========================
    // Pricing
    // ===========================
    hourlyRate: {
      type: Number,
      default: 0,
    },

    milestoneRate: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Trust Score
    // ===========================
    trustScore: {
      type: Number,
      default: 100,
    },

    // ===========================
    // Email Verification
    // ===========================
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: "",
    },

    verificationTokenExpires: {
      type: Date,
    },

    // ===========================
    // Professional Verification
    // ===========================
    isProfessionalVerified: {
      type: Boolean,
      default: false,
    },

    // ===========================
    // Forgot Password
    // ===========================
    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpires: {
      type: Date,
    },

    // ===========================
    // Two Factor Authentication
    // ===========================
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: "",
    },

    otpExpires: {
      type: Date,
    },

    otpAttempts: {
      type: Number,
      default: 0,
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Not Requested"],
      default: "Not Requested",
  },
  
  verificationRemark: {
      type: String,
      default: "",
  },

  verificationStatus: {
    type: String,
    enum: [
        "Not Requested",
        "Pending",
        "Approved",
        "Rejected",
    ],
    default: "Not Requested",
},

verificationRemark: {
    type: String,
    default: "",
},

isProfessionalVerified: {
    type: Boolean,
    default: false,
},

isOnline: {
  type: Boolean,
  default: false,
},

lastSeen: {
  type: Date,
  default: null,
},
isSuspended: {
  type: Boolean,
  default: false,
},

isVerifiedFreelancer: {
  type: Boolean,
  default: false,
},
isVerifiedFreelancer: {
  type: Boolean,
  default: false,
},

profileViews: {
  type: Number,
  default: 0,
},

searchAppearances: {
  type: Number,
  default: 0,
},

gigViews: {
  type: Number,
  default: 0,
},
profilePhoto:{
  type:String,
  default:""
},


bio:{
  type:String,
  default:""
},


phone:{
  type:String,
  default:""
},


location:{
  type:String,
  default:""
},


skills:[{

  type:String

}],


experience:{
  type:String,
  default:""
},


portfolio:{
  type:String,
  default:""
},

github:{
  type:String,
  default:""
},

linkedin:{
  type:String,
  default:""
},
  },
  {
    timestamps: true,
  }

  
);

module.exports = mongoose.model("User", userSchema);