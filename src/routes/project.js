const express = require("express");
const Project = require("../models/project");

const projectRouter = express.Router();

projectRouter.post("/add-project", async (req, res) => {
  try {
    const { projectName, description, skills, isActive, members } = req.body;

    const project = new Project({
      projectName,
      description,
      skills,
      isActive,
      members,
    });

    await project.save();
    res.status(201).json({ msg: "project added successfully", data: project });
  } catch (e) {
    res.status(400).json({ error: "Registration failed: " + e.message });
  }
});

module.exports = projectRouter;
