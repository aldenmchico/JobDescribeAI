// Import React ES Modules
import React from 'react';
import { useHistory } from 'react-router-dom'

export const AboutPage = ({}) => {
    const history = useHistory();
    return(
        <>  
            <article className="aboutPage">
                <h2 className="descriptionTitle">What is Job Describe.ai?</h2>
                <p className="description">JobDescribe.ai is a job description tool powered by OpenAI. Use JobDescribe.ai to learn more about the day-to-day tasks of a
                    career you're interested in, the estimated median income for a career in your given area, and much more. 
                    JobDescribe.ai can help you discover the possibilities that the professional world has to offer.
                </p>
                <br></br>
                <h2 className="descriptionTitle" >What can JobDescribe.ai Teach Me?</h2>
                <p className="description">JobDescribe.ai can give you...</p>
                <ul className="description">
                    <li>A general description of the daily work expected for a given career.</li>
                    <li>An estimated take-home salary for a career in a given location.</li>
                    <li>The educational requirements to pursue a given career.</li>
                </ul>
                <p className="description">The Customize Options menu allows you to cater your use of JobDescribe.ai to your personal needs.
                As JobDescribe.ai is developed, more features will be added to make JobDescribe.ai a more powerful tool for everyone to use.</p>
                <br></br>
                <h2 className="descriptionTitle">Who Developed JobDescribe.ai?</h2>
                <p className="description"> JobDescribe.ai is an active project developed by Alden Chico with microservices provided by Mckenzie Bourn.</p>

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

                    <label for="home"></label>
                    <button
                        type="submit"
                        id="home"
                        onClick={() => {history.push('/')}}
                    >Home</button>
                </form>

            </article>
             
        </>
    );
}

export default AboutPage;
