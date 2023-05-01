// Import React ES Modules
import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router-dom'
import {AiOutlineSearch, AiOutlineHourglass} from 'react-icons/ai'

// Import Functions
import * as PageFunction from '../functions/PageFunctions';

export const JobNotFoundPage = ({isJobTitle, setIsJobTitle, submitJobTitle, setSubmitJobTitle, jobTitle, setJobTitle, setDescriptions, options, didGenerate}) => {

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
                    <button
                        type="submit"
                        id="submit"
                        onClick={() => {history.push('/customize-page')}}
                    >Customize Options</button>

                    {didGenerate && <PageFunction.LastDescriptionButtonEnabled history={history}/>}
                    {!didGenerate && <PageFunction.LastDescriptionButtonDisabled history={history}/>}

                    <label for="home"></label>
                        <button
                            type="submit"
                            id="home"
                            onClick={() => {history.push('/')}}
                        >Home</button>
                    </form>
                    
                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle} location={location}/>}
                </div>
                
            </article>
             
        </>
    );
}

export default JobNotFoundPage;
