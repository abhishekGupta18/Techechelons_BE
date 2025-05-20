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

projectRouter.get("/allProjects", async (req, res) => {
  try {
    const allProjects = await Project.find({}).sort({ createdAt: -1 });
    res
      .status(201)
      .json({ msg: "ALl project fetched successfully", data: allProjects });
  } catch (e) {
    res.status(400).json({ error: "can't fetch all the projects" + e.message });
  }
});

projectRouter.get("/projects/search", async (req, res) => {
  try {
    const searchText = req.query.q;

    let projects;

    if (!searchText) {
      // No search query: return all projects
      projects = await Project.find({});
    } else {
      // Search with regex
      projects = await Project.find({
        $or: [
          { projectName: { $regex: searchText, $options: "i" } },
          { description: { $regex: searchText, $options: "i" } },
        ],
      });
    }

    res
      .status(200)
      .json({ msg: "Projects fetched successfully", data: projects });
  } catch (e) {
    res.status(400).json({ error: "Can't fetch the projects: " + e.message });
  }
});

module.exports = projectRouter;
