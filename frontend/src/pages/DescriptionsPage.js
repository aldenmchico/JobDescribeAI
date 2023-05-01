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
