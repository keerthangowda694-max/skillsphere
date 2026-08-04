const asyncHandler = require("express-async-handler");

const Availability = require("../models/Availability");

// ======================================
// Update Availability
// ======================================

const updateAvailability = asyncHandler(async (req, res) => {

    const {
        status,
        workingDays,
        startTime,
        endTime,
        timezone,
        vacationMode,
    } = req.body;

    let availability = await Availability.findOne({
        freelancer: req.user._id,
    });

    if (!availability) {

        availability = await Availability.create({

            freelancer: req.user._id,

            status,

            workingDays,

            startTime,

            endTime,

            timezone,

            vacationMode,

        });

    } else {

        availability.status = status || availability.status;

        availability.workingDays =
            workingDays || availability.workingDays;

        availability.startTime =
            startTime || availability.startTime;

        availability.endTime =
            endTime || availability.endTime;

        availability.timezone =
            timezone || availability.timezone;

        if (vacationMode !== undefined) {
            availability.vacationMode = vacationMode;
        }

        await availability.save();

    }

    res.status(200).json({

        success: true,

        message: "Availability updated successfully",

        availability,

    });

});

// ======================================
// Get My Availability
// ======================================

const getMyAvailability = asyncHandler(async (req, res) => {

    const availability = await Availability.findOne({

        freelancer: req.user._id,

    });

    if (!availability) {

        return res.status(404).json({

            success: false,

            message: "Availability not found",

        });

    }

    res.json({

        success: true,

        availability,

    });

});

// ======================================
// Get Freelancer Availability
// ======================================

const getFreelancerAvailability = asyncHandler(async (req, res) => {

    const availability = await Availability.findOne({

        freelancer: req.params.freelancerId,

    }).populate("freelancer", "fullName email");

    if (!availability) {

        return res.status(404).json({

            success: false,

            message: "Availability not found",

        });

    }

    res.json({

        success: true,

        availability,

    });

});

// ======================================
// Check Current Availability
// ======================================

const checkAvailability = asyncHandler(async (req, res) => {

    const availability = await Availability.findOne({

        freelancer: req.params.freelancerId,

    });

    if (!availability) {

        return res.status(404).json({

            success: false,

            message: "Availability not found",

        });

    }

    res.json({

        success: true,

        available:
            availability.status === "Available" &&
            !availability.vacationMode,

        status: availability.status,

        vacationMode: availability.vacationMode,

        workingDays: availability.workingDays,

        workingHours: `${availability.startTime} - ${availability.endTime}`,

        timezone: availability.timezone,

    });

});

module.exports = {

    updateAvailability,

    getMyAvailability,

    getFreelancerAvailability,

    checkAvailability,

};
