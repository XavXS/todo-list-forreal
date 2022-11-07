import project from './project';
import task from './task';
import note from './note';
import parseISO from 'date-fns/parseISO'

let projects = [];
let tasks = [];
let notes = [];

export function retrieveData() {
    //localStorage.setItem('tasks', null);
    retrieveProjects();
    retrieveTasks();
    retrieveNotes();
}

function retrieveProjects() {
    console.log('retrieving projects data...');

    let projectsData = JSON.parse(localStorage.getItem('projects'));
    if(!projectsData) {
        console.log('projects data could not be found');
        return;
    }

    console.log('found projects data:\n' + projectsData);

    projectsData.forEach(p => {

        console.log('found project data:\n' + p);

        let newProject = new project(p.title, p.desc);
        p.tasks.forEach(t => {

            console.log('found task data:\n' + t);

            newProject.addTask(
                new task(
                    t._title,
                    t._desc,
                    parseISO(t._due),
                    t._prio
                )
            );
        });

        console.log('assembled project:\n' + newProject);

        projects.push(newProject);
    });
}

function retrieveTasks() {
    let tasksData = JSON.parse(localStorage.getItem('tasks'));
    if(!tasksData) return;
    tasksData.forEach(t => {
        tasks.push(
            new task(
                t._title,
                t._desc,
                parseISO(t._due),
                t._prio
            )
        )
    });
}

function retrieveNotes() {
    let notesData = JSON.parse(localStorage.getItem('notes'));
    if(!notesData) return;
    notesData.forEach(n => {
        notes.push(
            n._title,
            n._desc,
            n._color
        );
    });
}

export function createProject() {
    let newProject = 
        new project(
            'New Project', 
            'Enter Description'
        );
    projects.push(newProject);
    saveProjects();
    return newProject;
}

export function createTask() {
    let newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    let newTask = 
        new task(
            'New Task',
            'Enter Description',
            newDate,
            1
        );
    tasks.push(newTask);
    saveTasks();
    return newTask;
}

export function createNote() {
    notes.push(
        new note(
            'New Note',
            'Enter Details',
            '#FFFFFF'
        )
    );
    saveNotes();
}

export function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(JSON.stringify(tasks));
}

export function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function getTasks() { return tasks; }

export function getProjects() { return projects; }

export function getNotes() { return notes; }

export function removeTask(targetTask) {
    const index = tasks.indexOf(targetTask);
    if(index > -1) tasks.splice(index, 1);
    saveTasks();
}

export function removeProject(targetProject) {
    const index = projects.indexOf(targetProject);
    if(index > -1) projects.splice(index, 1);
    saveProjects();
}

export function removeNote(targetNote) {
    const index = projects.indexOf(targetNote);
    if(index > -1) projects.splice(index, 1);
    saveNotes();
}