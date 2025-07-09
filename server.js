/********************************************************************************
*  WEB322 – Assignment 04
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Kamdin Kianpour
*  Student ID: 134281229
*  Date: July 9, 2025
*  Published URL:
********************************************************************************/
const express = require('express');
const path = require('path');
const app = express();
const projectData = require("./modules/projects");
//set up static folder
app.use(express.static(path.join(__dirname, 'public')));
//configuring EJS
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
//initialize projct data
projectData.initialize()
    .then(() => console.log("Initialization complete"))
    .catch(err => console.error("Failed to initialize:", err));
//test route
app.get("/test", (req, res) => {
    console.log("Received request for /test");
    res.send("Test route working");
});
//home route
app.get("/", (req, res) => {
    console.log("Received request for /");
    res.render("home", { page: "/" });
});
//about route
app.get("/about", (req, res) => {
    console.log("Received request for /about");
    res.render("about", { page: "/about" });
});
//projects route with optional sector query
app.get("/solutions/projects", (req, res) => {
    console.log("Received request for /solutions/projects");
    const sector = req.query.sector;
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(data => {
                console.log(`Rendering ${data.length} ${sector} projects`);
                res.render("projects", { projects: data, page: "/solutions/projects" });
            })
            .catch(err => {
                console.log("Error in /solutions/projects:", err);
                res.status(404).render("404", { message: `No projects found for sector: ${sector}`, page: "" });
            });
    } else {
        projectData.getAllProjects()
            .then(data => {
                console.log(`Rendering ${data.length} projects`);
                res.render("projects", { projects: data, page: "/solutions/projects" });
            })
            .catch(err => {
                console.log("Error in /solutions/projects:", err);
                res.status(404).render("404", { message: "No projects found", page: "" });});}});
//project by ID route
app.get("/solutions/projects/:id", (req, res) => {
    console.log(`Received request for /solutions/projects/${req.params.id}`);
    projectData.getProjectById(parseInt(req.params.id))
        .then(data => {
            console.log(`Rendering project ID ${req.params.id}:`, data.title);
            res.render("project", { project: data, page: "" });
        })
        .catch(err => {
            console.log("Error in /solutions/projects/:id:", err);
            res.status(404).render("404", { message: `No project found with ID: ${req.params.id}`, page: "" });
        });});
//404 handlr
app.use((req, res) => {
    console.log(`Received request for unknown route: ${req.url}`);
    res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for", page: "" });
});
//start server
app.listen(8080, () => {
    console.log("Server running on port 8080");
});