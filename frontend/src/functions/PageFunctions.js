function LoadingText({jobTitle}){
    return (
        <div className="LoadingText">
            <p>Job Description for {jobTitle} is Loading...</p>
        </div>
    );
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
        //alert(responseObject);
        if (responseObject === false) {
            setIsJobTitle(false)
            setIsSearch(false)
            setDidSubmit(false)
            setSubmitJobTitle(jobTitle);
            //alert(isJobTitle);
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
            //alert(isJobTitle);
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

export {LoadingText, getJobDescription}