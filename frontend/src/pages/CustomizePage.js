// Import React ES Modules
import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

// Import React components
import OptionsList  from '../components/OptionsList';

export const CustomizePage = ({isJobTitle, setIsJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, options, setOptions, didGenerate}) => {

    // State variables that will be set when the user edits the field
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();

    // Function that removes an option value from the options list and updates the options state variable
    const deleteOption = value => {
        let optionsCopy = options.slice();
        const idx = optionsCopy.indexOf(value);
        optionsCopy.splice(idx, 1);
        setOptions(optionsCopy);
    }

    // Function that adds an option value to the options list and updates the options state variable. Options that already exist cannot be added again.
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

                    {/* Form for creating a new job description page */}
                    <PageFunction.InputForm jobTitle={jobTitle} setJobTitle={setJobTitle} setLocation={setLocation}/>
                    
                    {isSearch? <AiOutlineHourglass size={50}/>:
                    <AiOutlineSearch size={50} onClick={()=>{
                        setDidSubmit(true);
                        setIsSearch(!isSearch);
                        PageFunction.getJobDescription(isJobTitle, setIsJobTitle, jobTitle, setSubmitJobTitle, 
                            history, location, setDescriptions, setIsSearch, setDidSubmit, options);
                        }} />
                    }

                    <div>
                        {/* Enables / Disables the Last Search button if there is a previously generated job description */}
                        {didGenerate && <PageFunction.LastDescriptionButtonEnabled history={history}/>}
                        {!didGenerate && <PageFunction.LastDescriptionButtonDisabled history={history}/>}

                        {/* Button to navigate to the home page */}
                        <label for="home"></label>
                        <button
                            type="submit"
                            id="home"
                            onClick={() => {history.push('/')}}
                        >Home</button>

                        {/* Button to perform a random job title search */}
                        <label for="random"></label>
                        <button
                            type="submit"
                            id="random"
                            onClick={
                                async () => {
                                    let randomJobTitle = await fetch(`/RandomJobTitle`);
                                    randomJobTitle = await randomJobTitle.json();
                                    setJobTitle(randomJobTitle);
                                    setDidSubmit(true);
                                    setIsSearch(!isSearch);
                                    PageFunction.getJobDescription(isJobTitle, setIsJobTitle, randomJobTitle, setSubmitJobTitle, 
                                            history, location, setDescriptions, setIsSearch, setDidSubmit, options);
                                }
                            }
                        >Get Lucky!</button>
                    </div>

                    {/* Displays Loading Text after submitting the form for a new job description page */}
                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle} location={location}/>}

                    {/* React component that uses the options state variable to display description customization options */}
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
