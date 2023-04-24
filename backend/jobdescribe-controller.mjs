import 'dotenv/config';
import express from 'express';
import * as jdModel from './jobdescribe-model.mjs';

// Configure express server
const PORT = process.env.PORT;
const app = express();
app.use(express.json());



// CREATE controller ******************************************

// RETRIEVE controller ****************************************************

    // GET /jobtitlecheck
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns true or false
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/jobtitlecheck/:_jobtitle', (req,res) => { 
        jdModel.checkJobTitle(
            req.params._jobtitle
            )
            .then(isJobTitle => {
                res.status(201).json(isJobTitle.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

    // GET /dailywork
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns true or false
        // Body: JSON object with the day-to-day work for a given job title
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

        app.get ('/dailywork/:_jobtitle', (req,res) => { 
            jdModel.getDailyWork(
                req.params._jobtitle
                )
                .then(dailyWork => {
                    res.status(201).json(dailyWork.result);
                })
                // Catch will occur if one of the fields is invalid
                .catch(error => {
                    res.status(400).json(error);
                });
            }
        );

    // GET /edrequirements
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns the educational requirements for an occupation
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/edrequirements/:_jobtitle', (req,res) => { 
        jdModel.getEdRequirements(
            req.params._jobtitle
            )
            .then(edRequirements => {
                res.status(201).json(edRequirements.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

    // GET /institutions
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns a list of institutions for an occupation
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/institutions/:_jobtitle/:_state', (req,res) => { 
        jdModel.getInstitutions(
            req.params._jobtitle,
            req.params._state
            )
            .then(institutions => {
                res.status(201).json(institutions.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

    // GET /educationcost
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns the median cost for an education to become an occupation in a given state
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/educationcost/:_jobtitle/:_state', (req,res) => { 
        jdModel.getEducationCost(
            req.params._jobtitle,
            req.params._state
            )
            .then(institutions => {
                res.status(201).json(institutions.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

    // GET /salary
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns the median salary for a job title in a given state
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/salary/:_jobtitle/:_state', (req,res) => { 
        jdModel.getMedianSalary(
            req.params._jobtitle,
            req.params._state
            )
            .then(salary => {
                res.status(201).json(salary.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

    // GET /jobopenings
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns 5 job openings for a job title in a given state
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/jobopenings/:_jobtitle/:_state', (req,res) => { 
        jdModel.getJobOpenings(
            req.params._jobtitle,
            req.params._state
            )
            .then(jobOpenings => {
                res.status(201).json(jobOpenings.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

    // GET /jobcompanies
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns 5 companies that hire for a job title in a given state
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/jobcompanies/:_jobtitle/:_state', (req,res) => { 
        jdModel.getCompanies(
            req.params._jobtitle,
            req.params._state
            )
            .then(companies => {
                res.status(201).json(companies.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );
    
    // GET /jobskills
    // Request: Job title path parameter, Request body is a JSON object with the job title
    // Response: Success - Request is valid and returns skills and software needed to be that job title
        // Body: JSON object containing true or false
        // Status Code: 201
    // Response: Failure - Request is invalid
        // Body: JSON object Error
        // Status Code: 400

    app.get ('/jobskills/:_jobtitle/', (req,res) => { 
        jdModel.getJobSkills(
            req.params._jobtitle,
            req.params._state
            )
            .then(jobOpenings => {
                res.status(201).json(jobOpenings.result);
            })
            // Catch will occur if one of the fields is invalid
            .catch(error => {
                res.status(400).json(error);
            });
        }
    );

// UPDATE controller ************************************

// DELETE Controller ******************************

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});