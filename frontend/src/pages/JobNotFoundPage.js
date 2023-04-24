// Import React ES Modules
import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

export const JobNotFoundPage = ({isJobTitle, setIsJobTitle, submitJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, options}) => {

    // State variables that will be set when the user edits the fields
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();
    
    return(
        <>  
            <article className="JobInput">
                <p className="pageDescriptor">Could not generate a job description for {submitJobTitle}</p>
                <div>
                    <form onSubmit={(e) => { e.preventDefault();}}>
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
                        </select>
                        
                        {isSearch? <AiOutlineHourglass size={50}/>:
                        <AiOutlineSearch size={50} onClick={()=>{
                            setDidSubmit(true);
                            setIsSearch(!isSearch);
                            PageFunction.getJobDescription(isJobTitle, setIsJobTitle, jobTitle, setSubmitJobTitle, 
                                history, location, setDescriptions, setIsSearch, setDidSubmit, options);
                            }} />
                        }

                    </form>

                    <br></br>
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
                    
                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle}/>}
                </div>
                
            </article>
             
        </>
    );
}

export default JobNotFoundPage;
