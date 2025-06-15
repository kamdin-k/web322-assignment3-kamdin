/* WEB322 - Assignment 02
 * 
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * 
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 * 
 * Name: Kamdin Kianpour
 * Student ID: 134281229
 * Date: jun 1, 2025
 */
//getting the project and sector data files
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");
//making an empty array for project
let projects = [];
//this function puts all the project data into the projects array
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            //going through each project in projectData
            projectData.forEach(project => {
                //finding the matching sector for this project
                const sector = sectorData.find(s => s.id === project.sector_id);
                if (sector) {
                    projects.push({ ...project, sector: sector.sector_name });
                }
            });
            resolve();
        } catch (err) {
            reject("Error initializing projects");
        }
    });
}

//this function give back all the projects i have
function getAllProjects() {
    return new Promise((resolve, reject) => {
        //checking if there are any projects in the array
        if (projects.length > 0) {
            resolve(projects);
        } else {
            // no projects, so it’ll send an error
            reject("No projects found");
        }
    });
}
//this function looks for a project by its id
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        //find a project that matche the id
        const project = projects.find(p => p.id === parseInt(projectId));
        if (project) {
            resolve(project);
        } else {
            reject("Unable to find requested project");
        }
    });
}
//this function finds projects that have a certain sector
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        // where the sector matches 
        const filtered = projects.filter(p => p.sector.toLowerCase().includes(sector.toLowerCase()));
        // if found any matching projects, it’ll send them
        if (filtered.length > 0) {
            resolve(filtered);
        } else {
            reject("Unable to find requested projects");
        }
    });
}
//letting other files use these functions
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
