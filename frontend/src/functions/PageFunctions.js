// This function returns Loading Text after the user submits their job description query
function LoadingText({jobTitle, location}){
    return (
        <div className="LoadingText">
            <p>Job description for {jobTitle} in the state of {location} is loading. This will take a moment. Please be patient while the page loads.</p>
        </div>
    );
}

// This function returns the job title and location forms that are used to enter the job description query
function InputForm({jobTitle, setJobTitle, setLocation}) {
    return (
        <>
            <label for="jobTitle">Job Title</label>
                        <input
                            type="text"
                            placeholder="Get a Job Description..."
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                            className="jobInput" 
                            id="jobTitle" />

            <label for="location">Location</label>
            <select 
                    type="text"
                    name="location"
                    onChange={e => setLocation(e.target.value)} 
                    className="locationInput"
                    id="location"
                    required>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
            </select>
        </>
    );
}

// This function returns a button that enables navigation to the last search page
function LastDescriptionButtonEnabled({history}) {
    return (
        <>
            <label for="lastDescription"></label>
            <button
                type="submit"
                id="lastDescription"
                onClick={() => {history.push('/descriptions')}}
            >Last Search</button>
        </>
    )
}

// This function returns a button that disables navigation to the last search page
function LastDescriptionButtonDisabled({history}) {
    return (
        <>
            <label for="lastDescription"></label>
            <button
                type="submit"
                id="lastDescription"
                disabled
                onClick={() => {history.push('/descriptions')}}
            >Last Search</button>
        </>
    )
}

// This function uses the options argument to make calls to backend endpoints to generate job description information for the descriptions page
const getJobDescription = async (isJobTitle, setIsJobTitle, jobTitle, setSubmitJobTitle, history, location, setDescriptions, setIsSearch, setDidSubmit, options) => {

    // Automatically push to the job not found page if there's no job entered in the entry field
    if (jobTitle === '' || jobTitle === undefined) {
        setIsSearch(false)
        setDidSubmit(false)
        setSubmitJobTitle(jobTitle);
        history.push('/job-not-found');
    }

    else {
        // Run an initial check on the job title to see if it's valid
        let response = await fetch(`/jobtitlecheck/${jobTitle}`);
        const responseObject = await response.json();

        // Set corresponding state variables and push to the job not found page if the page is invalid
        if (responseObject === false) {
            setIsJobTitle(false)
            setIsSearch(false)
            setDidSubmit(false)
            setSubmitJobTitle(jobTitle);
            history.push('/job-not-found');
        }

        // Make calls to endpoints if a valid job title was entered in the job title entry field
        else if (responseObject === true) {

            // Use the options variable to populate descriptions with responses from backend endpoints.
            const descriptions = {};
            for(let i = 0; i < options.length; i++) {
                if (options[i] === "Daily Work") {
                    response = await fetch(`/dailywork/${jobTitle}`);
                    const dailyWork = await response.json();
                    descriptions.dailyWork = dailyWork;
                }
                else if (options[i] === "Salary Information") {
                    response = await fetch(`/salary/${jobTitle}/${location}`);
                    const salary = await response.json();
                    descriptions.salary = salary;
                }
                else if (options[i] === "Educational Requirements") {
                    response = await fetch(`/edrequirements/${jobTitle}`);
                    const edRequirements = await response.json();
                    descriptions.edRequirements = edRequirements;
                }
                else if (options[i] === "List of Institutions") {
                    response = await fetch(`/institutions/${jobTitle}/${location}`);
                    const institutions = await response.json();
                    descriptions.institutions = institutions;
                }
                else if (options[i] === "Cost of Education") {
                    response = await fetch(`/educationcost/${jobTitle}/${location}`);
                    const edCost = await response.json();
                    descriptions.edCost = edCost;
                }
                else if (options[i] === "Job Resources") {
                    response = await fetch(`/jobopenings/${jobTitle}/${location}`);
                    const jobResources = await response.json();
                    descriptions.jobResources = jobResources;
                }
                else if (options[i] === "Company List") {
                    response = await fetch(`/jobcompanies/${jobTitle}/${location}`);
                    const companyList = await response.json();
                    descriptions.companyList = companyList;
                }
                else if (options[i] === "Relavent Skills") {
                    response = await fetch(`/jobskills/${jobTitle}`);
                    const jobSkills = await response.json();
                    descriptions.jobSkills = jobSkills;
                }
            }

            // Set React state variables accordingly
            setDescriptions(descriptions);
            setIsJobTitle(true);
            setIsSearch(false);
            setDidSubmit(false);

            // Navigate to the descriptions page
            history.push('/descriptions');

            
            
        }
    }
}


export {LoadingText, InputForm, LastDescriptionButtonEnabled, LastDescriptionButtonDisabled, getJobDescription}