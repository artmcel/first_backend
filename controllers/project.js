'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home : function(req, res){
        return res.status(200).send({
            message: 'Soy el Home'
        });
    },
    test : function(req, res){
        return res.status(200).send({
            message: 'Soy el test del controlador project'
        });
    },

    //guardar datos en mongo
    saveProject : function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save( (err, projectStored) => {
            if(err) return res.status(500).send({ message: 'error al guardar el documento.'});
            if(!projectStored) return res.status(404).send({ message: 'No se ha podido guardar.'});
            return res.status(200).send({ project: projectStored});
        });
    },

    //obtener datos de mongo
    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({ message: 'No se ha podido guardar.'});

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({ message: 'error al guardar el documento.'});
            if(!project) return res.status(404).send({ message: 'No se ha podido guardar.'});

            return res.status(200).send({
                project
            });
        });
    },
    //obtener todos los datos
    getProjects: function(req, res){
        Project.find({}).exec( (err, projects) => {
            if(err) return res.status(500).send({ message: 'error al mostrar projects.'});
            if(!projects) return res.status(404).send({ message: 'No hay projects que mostar.'});

            return res.status(200).send({ projects });
        });
    },
    //actualizar datos de un project
    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdate) => {
            if(err) return res.status(500).send({ message: 'error al actualiazar el projecto.'});
            if(!projectUpdate) return res.status(404).send({ message: 'No hay proyecto a actualizar.'});

            return res.status(200).send({
                project: projectUpdate
            });
        });
    },
    // borrar un project
    deleteProject: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDelete)=>{
            if(err) return res.status(500).send({ message: 'No se ha podido borrar'});
            if(!projectDelete) return res.status(404).send({ message: 'No se puede eliminar.'});

            return res.status(200).send({
                project: projectDelete
            });
        });
    },
    //subir imagenes
    uploadImage: function(req, res){
        var projectId = req.params.id;
        var findName = 'Imagen no subida';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, ProjectUpdated) => {
                if(err) return res.status(500).send({ message: 'No se ha podido borrar'});
                if(!ProjectUpdated) return res.status(404).send({ message: 'No se puede eliminar.'});

                return res.status(200).send({
                    project: ProjectUpdated
                });
            });
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen"
                });
            }
        });
    }
};
module.exports = controller;