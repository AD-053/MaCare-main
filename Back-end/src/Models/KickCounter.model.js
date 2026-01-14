import mongoose from "mongoose";

const KickCounterSchema = new mongoose.Schema({
    motherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    firstKickTime: {
        type: Date,
        required: true
    },
    lastKickTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // Duration in seconds
        required: true
    },
    kickCount: {
        type: Number,
        required: true,
        min: 0
    },
    pregnancyWeek: {
        type: Number,
        min: 0,
        max: 42
    },
    notes: {
        type: String,
        maxlength: 500
    },
    // Session metadata
    sessionCompleted: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient querying by mother and date
KickCounterSchema.index({ motherID: 1, date: -1 });

// Virtual for formatted duration
KickCounterSchema.virtual('formattedDuration').get(function() {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}m ${seconds}s`;
});

export const KickCounter = mongoose.model("KickCounter", KickCounterSchema);
