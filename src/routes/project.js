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

projectRouter.patch("/project/edit/:id", async (req, res) => {
  try {
    const updatedData = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ msg: "Project updated", data: updatedProject });
  } catch (e) {
    res
      .status(400)
      .json({ error: "can't update the project details: " + e.message });
  }
});

projectRouter.delete("/project/delete/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete({
      _id: req.params.id,
    });

    res
      .status(201)
      .json({ msg: "project deleted successfully", data: deletedProject });
  } catch (e) {
    res.status(400).json({ error: "can't delete the project" + e.message });
  }
});

module.exports = projectRouter;
