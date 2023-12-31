// Develop/controllers/api/projectRoutes.js
const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll();
    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('home', { projects }); // Replace 'homepage' with your actual homepage handlebars filename without the extension if it's different
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    const project = projectData.get({ plain: true });

    res.render('project', { project }); // This will render the project.handlebars view with the project data
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
