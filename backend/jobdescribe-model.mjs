// Import dependencies.
import { Configuration, OpenAIApi } from "openai";
import 'dotenv/config';
import fetch from 'node-fetch'

// Configure connection to OpenAI's API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

// CREATE model *****************************************

// RETRIEVE models *****************************************

// Retrieve a true or false response based on the entered job title.
const checkJobTitle = async (_jobtitle) => {
    const prompt = `Answer yes or no without using any punctuation (do not include a period): is ${_jobtitle} an occupation?`;
    const regexYes = new RegExp("Yes*");
    const regexNo = new RegExp("No*");
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content;
        if (regexYes.test(result)) {
            result = true;
        }
        else if (regexNo.test(result)) {
            result = false;
        }
        else {
            result = undefined;
        }
    });
    return {"result": result};
}

// Retrieve random job title
const callRandomJobTitleMicroservice = async () => {
    let result = await fetch('http://localhost:8001/RandomJobTitle')
    result = await result.text()
    return {"result": result}
};

// Retrieve the educational requirements for a given job title.
const getDailyWork = async (_jobtitle) => {
    const prompt = `Give me a paragraph listing the day-to-day tasks for a ${_jobtitle}?`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content;
    });
    return {"result": result};
}

// Retrieve the educational requirements for a given job title.
const getEdRequirements = async (_jobtitle) => {
    const prompt = `Give me a paragraph for the educational requirements to become a ${_jobtitle}.`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content.replaceAll("\n", "</br>");
    });
    return {"result": result};
}


// Retrieve a list of best places to learn for a given job title.
const getInstitutions = async (_jobtitle, _state) => {

    const prompt = `Give me a list of 5 institutions that I can attend to receive and education to become a ${_jobtitle} in the state of ${_state}
                    with a link to the institution's home website
                    (just the list with no other context)`
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content.replaceAll("\n", "</br>");
    });
    return {"result": result};
}


// Retrieve the median cost of education to become that job title in a given state.
const getEducationCost = async (_jobtitle, _state) => {
    const prompt = `Give me the average cost to receive an education to become a ${_jobtitle} in the state of ${_state} (just the dollar amount with no other context)`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content.replaceAll("\n", "</br>");
        const regex = /\$\d+(,\d{3})*(\.\d{2})?/;
        const match = result.match(regex);

        if (match) {
            result = match[0];
        }
        else {
            result = `Unable to provide educational cost information for ${_jobtitle} at this moment.`
        }
    });
    return {"result": result};
}

// Get the local median salary for a given job title.
const getMedianSalary = async (_jobtitle, _state) => {
    const prompt = `Give me the average salary for ${_jobtitle} in the state of ${_state} (just the dollar amount with no other context)`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content;
        const regex = /\$\d+(,\d{3})*(\.\d{2})?/;
        const match = result.match(regex);

        if (match) {
            result = match[0];
        }
        else {
            result = `Unable to provide median salary information for ${_jobtitle} at this moment.`
        }
    });
    return {"result": result};
}

// Get the local median salary for a given job title.
const getJobOpenings = async (_jobtitle, _state) => {
    const prompt = `Give me a list of 5 links to active job openings for ${_jobtitle} in the state of ${_state} (just the list with no other context)`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content.replaceAll("\n", "</br>");
    });
    return {"result": result};
}

// Get a list of companies for a given job title in a designated state.
const getCompanies = async (_jobtitle, _state) => {
    const prompt = `Give me a list of 5 companies that hire for ${_jobtitle} in the state of ${_state} 
                    and their company's website (just the list with no other context)`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content.replaceAll("\n", "</br>");
        console.log(aiResult);
    });
    return {"result": result};
}

// Get the tools of the trade for a given job title
const getJobSkills = async (_jobtitle, _state) => {
    const prompt = `Give me a list of 5 skills and software commonly used as a ${_jobtitle} (just the numbered list with no other context)`;
    let result;
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6,
        max_tokens: 1000
    })
    .then(aiResult => {
        result = aiResult.data.choices[0].message.content.replaceAll("\n", "</br>");
    });
    return {"result": result};
}

// UPDATE model *****************************************************

// DELETE model *****************************************

// Exports for jobdescribe-controller
export {checkJobTitle, callRandomJobTitleMicroservice, getDailyWork, getEdRequirements, 
            getInstitutions, getEducationCost, getMedianSalary, getJobOpenings, 
            getCompanies, getJobSkills};