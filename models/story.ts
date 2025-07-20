import mongoose, { Schema, model, models } from "mongoose";

export interface IStory {
    authorId: mongoose.Types.ObjectId;
    _id?: mongoose.Types.ObjectId;
    location: string;
    images: string[];
    details: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const storySchema = new Schema<IStory>(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // Reference the User model
            required: true
        },
        location: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        details: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Story = models?.Story || model<IStory>("Story", storySchema);
console.log("Story model loaded *****************************************************************************");

export default Story;


console.log("Story model loaded");
