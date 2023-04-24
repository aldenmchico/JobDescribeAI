// Import React ES Modules
import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

export const HomePage = ({isJobTitle, setIsJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, options}) => {

    // State variables that will be set when the user edits the field
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();

    return(
        <>  
            <article className="JobInput">
                <h2 className="pageDescriptor">Enter a Job Title and Location</h2>
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
                        <label for="customizeOptions"></label>
                        <button
                            type="submit"
                            id="customizeOptions"
                            onClick={() => {history.push('/customize-page')}}
                        >Customize Options</button>
                        
                        <label for="lastDescription"></label>
                        <button
                            type="submit"
                            id="lastDescription"
                            onClick={() => {history.push('/descriptions')}}
                        >Last Search</button>

                        <label for="about"></label>
                        <button
                            type="submit"
                            id="about"
                            onClick={() => {history.push('/about')}}
                        >About</button>
                    </form>
                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle}/>}

                </div>
                
            </article>
             
        </>
    );
}

export default HomePage;
