import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

export const DescriptionsPage = ({isJobTitle, setIsJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, descriptions, options}) => {
    
    // State variables that will be set when the user edits the fields
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();
    
    return (
        <>
        <article className="descriptionsPage">

            <form onSubmit={(e) => { e.preventDefault();}}>
                    <label for="jobTitle">Job Title</label>
                        <input
                            type="text"
                            placeholder="Get a Job Description..."
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)} 
                            id="jobTitle"
                            required />

                    <label for="location">Location</label>
                    <select 
                            type="text"
                            name="location"
                            onChange={e => setLocation(e.target.value)} 
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

            {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle}/>}
            
            <h2 className="descriptionTitle">Estimated Median Salary</h2>
            <p className="description">{descriptions.salary}</p>
            <br></br><br></br>
            <h2 className="descriptionTitle">Daily Work Summary</h2>
            <p className="description">{descriptions.dailyWork}</p>
            <br></br> <br></br>
            <h2 className="descriptionTitle">Educational Requirements</h2>
            <p className="description">{descriptions.edRequirements}</p>
            <br></br> <br></br>
            
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
