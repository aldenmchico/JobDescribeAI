// Import React ES Modules
import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

export const HomePage = ({isJobTitle, setIsJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, options, didGenerate}) => {

    // State variables that will be set when the user edits the field
    const [location, setLocation]           = useState("AL");
    const [isSearch, setIsSearch]           = useState(false);
    const [didSubmit, setDidSubmit]         = useState(false);
    const history = useHistory();

    return(
        <>  
            <article className="homePage">
                <h2 className="mainPageDescriptor">Enter a job title and location. We'll generate a comprehensive job description from your entry.</h2>
                <div>
                
                    {/* Form for creating a new job description page */}
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
                    
                    <br></br>

                    <form onSubmit={(e) => { e.preventDefault();}}>

                        {/* Button to navigate to the customize options page */}
                        <label for="customizeOptions"></label>
                        <button
                            type="submit"
                            id="customizeOptions"
                            onClick={() => {history.push('/customize-page')}}
                        >Customize Options</button>
                        
                        {/* Enables / Disables the Last Search button if there is a previously generated job description */}
                        {didGenerate && <PageFunction.LastDescriptionButtonEnabled history={history}/>}
                        {!didGenerate && <PageFunction.LastDescriptionButtonDisabled history={history}/>}
                        
                        {/* Button to navigate to the about page */}
                        <label for="about"></label>
                        <button
                            type="submit"
                            id="about"
                            onClick={() => {history.push('/about')}}
                        >About</button>
                    </form>
                    
                    <h2 className="mainPageDescriptor">Don't have a job title in mind? Generate a job description for a random job title instead.</h2>
                    <br></br>
                    
                    {/* Button to perform a random job title search */}
                    <form onSubmit={(e) => { e.preventDefault();}}>
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
                    </form>
                    
                    {/* Displays Loading Text after submitting the form for a new job description page */}
                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle} location={location}/>}

                </div>
                
            </article>
             
        </>
    );
}

export default HomePage;
