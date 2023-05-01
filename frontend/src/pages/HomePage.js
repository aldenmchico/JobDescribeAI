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
                        <label for="customizeOptions"></label>
                        <button
                            type="submit"
                            id="customizeOptions"
                            onClick={() => {history.push('/customize-page')}}
                        >Customize Options</button>
                        
                        {didGenerate && <PageFunction.LastDescriptionButtonEnabled history={history}/>}
                        {!didGenerate && <PageFunction.LastDescriptionButtonDisabled history={history}/>}

                        <label for="about"></label>
                        <button
                            type="submit"
                            id="about"
                            onClick={() => {history.push('/about')}}
                        >About</button>
                    </form>

                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle} location={location}/>}

                </div>
                
            </article>
             
        </>
    );
}

export default HomePage;
