/* WEB322 - Assignment 03
 * 
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * 
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 * 
 * Name: Kamdin Kianpour
 * Student ID: 134281229
 * Date: June 13, 2025
 */
const express = require('express');
const path = require('path');
const app = express();
const projectData = require("./modules/projects");

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Initialize project data
projectData.initialize()
    .then(() => console.log("Initialization complete"))
    .catch(err => console.error("Failed to initialize:", err));

// Test route
app.get("/test", (req, res) => {
    console.log("Received request for /test");
    res.send("Test route working");
});

// Home route
app.get("/", (req, res) => {
    console.log("Received request for /");
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// About route
app.get("/about", (req, res) => {
    console.log("Received request for /about");
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Projects route with optional sector query
app.get("/solutions/projects", (req, res) => {
    console.log("Received request for /solutions/projects");
    const sector = req.query.sector;
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(data => {
                console.log(`Sending ${data.length} ${sector} projects`);
                res.json(data);
            })
            .catch(err => {
                console.log("Error in /solutions/projects:", err);
                res.status(404).json({ error: err });
            });
    } else {
        projectData.getAllProjects()
            .then(data => {
                console.log(`Sending ${data.length} projects`);
                res.json(data);
            })
            .catch(err => {
                console.log("Error in /solutions/projects:", err);
                res.status(404).json({ error: err });
            });
    }
});

// Project by ID route
app.get("/solutions/projects/:id", (req, res) => {
    console.log(`Received request for /solutions/projects/${req.params.id}`);
    projectData.getProjectById(parseInt(req.params.id))
        .then(data => {
            console.log(`Sending project ID ${req.params.id}:`, data.title);
            res.json(data);
        })
        .catch(err => {
            console.log("Error in /solutions/projects/:id:", err);
            res.status(404).json({ error: err });
        });
});

// 404 handler
app.use((req, res) => {
    console.log(`Received request for unknown route: ${req.url}`);
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(8080, () => {
    console.log("Server running on port 8080");
});