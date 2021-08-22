const express = require('express');
const router = express.Router();
const Projects = require('../models/Projects');

router.get('/:id', Projects.getProjects);
router.post('/create', Projects.createProject);
router.put('/update', Projects.updateProject);
router.put('/delete', Projects.deleteProject);

module.exports = router;
