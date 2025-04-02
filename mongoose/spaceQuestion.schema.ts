import { url } from "inspector";
import mongoose, { Schema, Types, model } from "mongoose";
import { Url } from "next/dist/shared/lib/router/router";
import { boolean, string } from "zod";

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
}

const QuestionSchema = new Schema({
  id: { type: String, required: true }, // Unique ID for each question
  question: { type: String, required: true }, // Question text
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
  },
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
