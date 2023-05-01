import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

export const DescriptionsPage = ({isJobTitle, setIsJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, 
                                    setDescriptions, descriptions, options, setDidGenerate}) => {
    
    // State variables that will be set when the user edits the fields
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();
    
    // After loading a Descriptions Page, set didGenerate to true to enable the Last Search button
    setDidGenerate(true);

    // Create two collections for institutions and the institutions' websites
    let institutionNames;
    let institutionLinks = {};
    let linkBreak, numberBreak;
    if (descriptions.institutions !== undefined) {
        
        institutionNames = descriptions.institutions.split("</br>");
        
        for(let i = 0; i < institutionNames.length; i++) {

            // Parse the institution's website link from the result
            linkBreak = institutionNames[i].split("-");
            institutionLinks[i.toString()] = linkBreak[1];
            institutionNames[i.toString()] = linkBreak[0];
            
            // Parse the institution's name from the result
            let iStr = (i+1).toString() + "."
            numberBreak = institutionNames[i].split(iStr);
            institutionNames[i] = numberBreak[1]
        }
    }

    let companyNames;
    let companyLinks = {};
    if (descriptions.companyList !== undefined) {
        
        companyNames = descriptions.companyList.split("</br>");

        for(let i = 0; i < companyNames.length; i++) {

            linkBreak = companyNames[i].split("-");
            companyLinks[i.toString()] = linkBreak[1];
            companyNames[i.toString()] = linkBreak[0];

            let iStr = (i+1).toString() + "."
            numberBreak = companyNames[i].split(iStr);
            companyNames[i] = numberBreak[1];
        }
    }

    // Create collections for job search websites
    let jobLinks;
    if (descriptions.jobResources !== undefined) {

        jobLinks = descriptions.jobResources.split("</br>");
        for(let i = 0; i < jobLinks.length; i++) {
            // Parse the job link from the result
            let iStr = (i+1).toString() + "."
            numberBreak = jobLinks[i].split(iStr);
            jobLinks[i] = numberBreak[1]
        }
    }
    
    return (
        <>
        <article className="descriptionsPage">

            <form onSubmit={(e) => { e.preventDefault();}}>
                    
                    <PageFunction.InputForm jobTitle={jobTitle} setJobTitle={setJobTitle} setLocation={setLocation}/>

                    {isSearch? <AiOutlineHourglass size={50}/>:
                    <AiOutlineSearch size={50} onClick={()=>{
                        setDidSubmit(true);
                        setIsSearch(!isSearch);
                        PageFunction.getJobDescription(isJobTitle, setIsJobTitle, jobTitle, setSubmitJobTitle, 
                            history, location, setDescriptions, setIsSearch, setDidSubmit, options);
                        }} />
                    }
            </form>

            {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle} location={location}/>}
            
            {descriptions.salary !== undefined && 
                <>
                    <h2 className="descriptionTitle">Estimated Median Salary</h2>
                    <p className="description">{descriptions.salary}</p>
                    <br></br><br></br>
                </>
            }

            {descriptions.dailyWork !== undefined && 
                <>
                    <h2 className="descriptionTitle">Daily Work Summary</h2>
                    <p className="description">{descriptions.dailyWork}</p>
                    <br></br> <br></br>
                </>
            }
            
            {descriptions.companyList !== undefined && 
                <>
                    <h2 className="descriptionTitle">List of Relavent Companies</h2>
                    <ol className="description">
                        <li><a href={companyLinks["0"]} rel="noreferrer" target="_blank">{companyNames["0"]}</a></li>
                        <li><a href={companyLinks["1"]} rel="noreferrer" target="_blank">{companyNames["1"]}</a></li>
                        <li><a href={companyLinks["2"]} rel="noreferrer" target="_blank">{companyNames["2"]}</a></li>
                        <li><a href={companyLinks["3"]} rel="noreferrer" target="_blank">{companyNames["3"]}</a></li>
                        <li><a href={companyLinks["4"]} rel="noreferrer" target="_blank">{companyNames["4"]}</a></li>
                    </ol>
                    <br></br><br></br>
                </>
            }

            {descriptions.jobResources !== undefined && 
                <>
                    <h2 className="descriptionTitle">Online Job Search Resources</h2>
                    <ol className="description">
                        <li><a href={jobLinks["0"]} rel="noreferrer" target="_blank">{jobLinks["0"]}</a></li>
                        <li><a href={jobLinks["1"]} rel="noreferrer" target="_blank">{jobLinks["1"]}</a></li>
                        <li><a href={jobLinks["2"]} rel="noreferrer" target="_blank">{jobLinks["2"]}</a></li>
                        <li><a href={jobLinks["3"]} rel="noreferrer" target="_blank">{jobLinks["3"]}</a></li>
                        <li><a href={jobLinks["4"]} rel="noreferrer" target="_blank">{jobLinks["4"]}</a></li>
                    </ol>
                    <br></br><br></br>
                </>
            }

            {descriptions.edCost !== undefined && 
                <>
                    <h2 className="descriptionTitle">Estimated Cost of Education</h2>
                    <p className="description">{descriptions.edCost}</p>
                    <br></br> <br></br>
                </>
            }

            {descriptions.edRequirements !== undefined && 
                <>
                    <h2 className="descriptionTitle">Educational Requirements</h2>
                    <p className="description">{descriptions.edRequirements}</p>
                    <br></br> <br></br>
                </>
            }

            
            {descriptions.institutions !== undefined && 
                <>
                    <h2 className="descriptionTitle">List of Institutions</h2>
                    <ol className="description">
                        <li><a href={institutionLinks["0"]} rel="noreferrer" target="_blank">{institutionNames["0"]}</a></li>
                        <li><a href={institutionLinks["1"]} rel="noreferrer" target="_blank">{institutionNames["1"]}</a></li>
                        <li><a href={institutionLinks["2"]} rel="noreferrer" target="_blank">{institutionNames["2"]}</a></li>
                        <li><a href={institutionLinks["3"]} rel="noreferrer" target="_blank">{institutionNames["3"]}</a></li>
                        <li><a href={institutionLinks["4"]} rel="noreferrer" target="_blank">{institutionNames["4"]}</a></li>
                    </ol>
                    <br></br><br></br>
                </>
            }
            

            <form onSubmit={(e) => { e.preventDefault();}}>
                <button
                    type="submit"
                    id="submit"
                    onClick={() => {history.push('/customize-page')}}
                >Customize Options</button>
                <label for="home"></label>
                <button
                    type="submit"
                    id="home"
                    onClick={() => {history.push('/')}}
                >Home</button>
            </form>
        </article>
        </>
    )
}
export default DescriptionsPage;
