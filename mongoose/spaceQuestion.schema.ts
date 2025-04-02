import mongoose, { Schema, Types, model } from "mongoose";


interface Question {
  id: string;
  question: string;
}

interface SpaceQuestionDocument {
  _id: Types.ObjectId;
  spaceId: Types.ObjectId;
  header: string;
  customDescription: string;
  textbuttonText: string;
  videoButtonText: string;
  questions: Question[];
  questionlabel: string;
  thankYouTitle: string;
  thankYouMessage: string;
  theme: string;
  thankyouimg: boolean;
  videoreviewEnabled: boolean;
  videotime: string;
  ratingEnabled: boolean;
  redirectUrl: string; 
  tags:Array<string>
}

const QuestionSchema = new Schema({
  id: { type: String, required: true }, 
  question: { type: String, required: true },
});

const SpaceQuestionSchema = new Schema<SpaceQuestionDocument>({
  spaceId: {
    type: Schema.Types.ObjectId,
    ref: "Space",
  },
  header: {
    type: String,
    required: [true, "header is required"],
  },
  customDescription: {
    type: String,
    required: [true, "customDescription is required"],
  },
  textbuttonText: {
    type: String,
    default: "Submit text testimonial",
  },
  videoButtonText: {
    type: String,
    default: "Submit Recording",
  },
  questions: [QuestionSchema],
  questionlabel: {
    type: String,
    required: [true, "textbuttonText is required"],
    default: "Questions",
  },
  thankYouTitle: {
    type: String,
    default: "ThankYou",
  },
  thankYouMessage: {
    type: String,
    default: "Your testimonial has been submitted successfully.",
  },tags:[{ type: String }],
  theme: {
    type: String,
    default: "light",
  },
  thankyouimg: {
    type: Boolean,
    default: false,
  },
  videoreviewEnabled: {
    type: Boolean,
    default: false,
  },
  videotime: {
    type: String,
    default: "30",
  },
  ratingEnabled: {
    type: Boolean,
    default: false,
  },
  redirectUrl: {
    type: String,
    required: false,
  },
});

const SpaceQuestion =
  mongoose.models?.SpaceQuestion ||
  model<SpaceQuestionDocument>("SpaceQuestion", SpaceQuestionSchema);

export default SpaceQuestion;
