const express = require("express");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    skills: {
      type: [String],
    },
    members: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;
