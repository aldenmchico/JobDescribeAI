function LoadingText({jobTitle, location}){
    return (
        <div className="LoadingText">
            <p>Job description for {jobTitle} in the state of {location} is loading...</p>
        </div>
    );
}

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
                        <option value="AL" selected>AL</option>
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

const getJobDescription = async (isJobTitle, setIsJobTitle, jobTitle, setSubmitJobTitle, history, location, setDescriptions, setIsSearch, setDidSubmit) => {

    if (jobTitle === '' || jobTitle === undefined) {
        setIsSearch(false)
        setDidSubmit(false)
        setSubmitJobTitle(jobTitle);
        history.push('/job-not-found');
    }

    else {
        let response = await fetch(`/jobtitlecheck/${jobTitle}`);
        const responseObject = await response.json();
        if (responseObject === false) {
            setIsJobTitle(false)
            setIsSearch(false)
            setDidSubmit(false)
            setSubmitJobTitle(jobTitle);
            history.push('/job-not-found');
        }
        else if (responseObject === true) {
            
            response = await fetch(`/dailywork/${jobTitle}`);
            const dailyWork = await response.json();
            
            response = await fetch(`/edrequirements/${jobTitle}`);
            const edRequirements = await response.json();
            
            response = await fetch(`/salary/${jobTitle}/${location}`);
            const salary = await response.json();
            const descriptions = {dailyWork: dailyWork, edRequirements:edRequirements, salary:salary};
            setDescriptions(descriptions);
            
            setIsJobTitle(true);
            setIsSearch(false);
            setDidSubmit(false);

            history.push('/descriptions');

            {/* IMPLEMENT LATER
            for(let i = 0; i < options.length; i++) {
                if (options[i] === "Daily Work") {
                    response = await fetch(`/dailywork/${jobTitle}`);
                    const dailyWork = await response.json();
                }
                else if (options[i] === "Median Salary") {
                    response = await fetch(`/salary/${jobTitle}/${location}`);
                    const salary = await response.json();
                }
                else if (options[i] === "Educational Requirements") {
                    response = await fetch(`/edrequirements/${jobTitle}`);
                    const edRequirements = await response.json();
                }
                else if (options[i] === "List of Institutions") {
                    response = await fetch(`/institutions/${jobTitle}/${location}`);
                    const institutions = await response.json();
                }
                else if (options[i] === "Cost of Education") {
                    response = await fetch(`/educationcost/${jobTitle}/${location}`);
                    const edCost = await response.json();
                }
                else if (options[i] === "Job Resources") {
                    response = await fetch(`/jobopenings/${jobTitle}/${location}`);
                    const jobResources = await response.json();
                }
                else if (options[i] === "Company List") {
                    response = await fetch(`/jobcompanies/${jobTitle}/${location}`);
                    const companyList = await response.json();
                }
                else if (options[i] === "Relavent Skills") {
                    response = await fetch(`/jobskills/${jobTitle}`);
                    const companyList = await response.json();
                }
            }

            setIsSearch(false);
            setDidSubmit(false);

            history.push('/descriptions');

            */}
            
        }
    }
}

export {LoadingText, InputForm, LastDescriptionButtonEnabled, LastDescriptionButtonDisabled, getJobDescription}