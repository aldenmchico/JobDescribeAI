// Import React ES Modules
import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

// Import React components
import OptionsList  from '../components/OptionsList';

export const CustomizePage = ({isJobTitle, setIsJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, options, setOptions}) => {

    // State variables that will be set when the user edits the field
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();

    const deleteOption = value => {
        let optionsCopy = options.slice();
        const idx = optionsCopy.indexOf(value);
        optionsCopy.splice(idx, 1);
        setOptions(optionsCopy);
    }

    const addOption = value => {
        let optionsCopy = options.slice();
        const idx = optionsCopy.indexOf(value);
        if (idx === -1) {
            optionsCopy.push(value);
            setOptions(optionsCopy)
        }
    }

    return(
        <>  
            <article className="JobInput">
                <h2 className="customizeDescriptor">Customize Options</h2>
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
                        PageFunction.getJobDescription(isJobTitle, setIsJobTitle, setSubmitJobTitle, history, location, setDescriptions, setIsSearch, setDidSubmit, options);
                        }} />
                    }

                    <div>
                    
                    <label for="lastDescription"></label>
                    <button
                        type="submit"
                        id="lastDescription"
                        onClick={() => {history.push('/descriptions')}}
                    >Last Search</button>

                    <label for="home"></label>
                    <button
                        type="submit"
                        id="home"
                        onClick={() => {history.push('/')}}
                    >Home</button>
                    </div>

                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle}/>}

                    <OptionsList
                        options={options}
                        setOptions={setOptions}
                        deleteOption={deleteOption}
                        addOption={addOption}
                    />
                    
                </form>
                
                </div>
                
            </article>
             
        </>
    );
}

export default CustomizePage;
