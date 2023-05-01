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
                    
                        {didGenerate && <PageFunction.LastDescriptionButtonEnabled history={history}/>}
                        {!didGenerate && <PageFunction.LastDescriptionButtonDisabled history={history}/>}

                        <label for="home"></label>
                        <button
                            type="submit"
                            id="home"
                            onClick={() => {history.push('/')}}
                        >Home</button>
                    </div>

                    {didSubmit && <PageFunction.LoadingText jobTitle={jobTitle} location={location}/>}

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
