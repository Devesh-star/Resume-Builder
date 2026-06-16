import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String,
    },
    template: {
        theme: String,
        colorPalette: [String],
        isCustom: { type: Boolean, default: false },
        customConfig: {
            layout: {
                type: String,
                enum: ['single', 'two-column-left', 'two-column-right'],
                default: 'two-column-left'
            },
            visibleSections: {
                summary: { type: Boolean, default: true },
                workExperience: { type: Boolean, default: true },
                education: { type: Boolean, default: true },
                skills: { type: Boolean, default: true },
                projects: { type: Boolean, default: true },
                certifications: { type: Boolean, default: true },
                languages: { type: Boolean, default: true },
                interests: { type: Boolean, default: true },
            },
            sectionOrder: [String],
            accentColor: { type: String, default: '#00f0ff' },
            fontFamily: { type: String, default: 'Inter' },
            headerStyle: {
                type: String,
                enum: ['centered', 'left-aligned', 'split'],
                default: 'left-aligned'
            },
        }
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String
    },
    workExperiences: [
        {
            company: String,
            role: String,
            startDate: String,
            endDate: String,
            description: String,
        },
    ],
    education: [
        {
            degree: String,
            institution: String,
            startDate: String,
            endDate: String,
        },
    ],
    skills: [
        {
            name: String,
            progress: Number,
        },
    ],
    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveDemo: String,
        },
    ],
    certifications: [
        {
            title: String,
            issuer: String,
            year: String,
        },
    ],
    languages: [
        {
            name: String,
            progress: Number,
        },
    ],
    interests: [String],
    customSections: [
        {
            id: String,
            title: String,
            items: [
                {
                    title: String,
                    subtitle: String,
                    date: String,
                    description: String,
                }
            ]
        }
    ],
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
}
);
export default mongoose.model("Resume",ResumeSchema)