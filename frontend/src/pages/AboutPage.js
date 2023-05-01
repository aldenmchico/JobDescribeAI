// Import React ES Modules
import React from 'react';
import { useHistory } from 'react-router-dom';

export const AboutPage = ({}) => {
    const history = useHistory();
    return(
        <>  
            <article className="aboutPage">

                {/* Descriptive text that explains the purpose of the website */}
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
                    <li>An estimated take-home salary for a given career in a specified location.</li>
                    <li>The educational requirements to pursue a given career.</li>
                    <li>A list of institutions to pursue an education for a given career in a specified location.</li>
                    <li>An estimated cost to pursue an education for a given career in a specified location.</li>
                    <li>A list of websites to start your job search for a given career in a specified location.</li>
                    <li>A list of companies that hire for a given career in a specified location.</li>
                    <li>A description of relavent skills expected for people that work in a given career.</li>
                </ul>
                <p className="description">The Customize Options menu allows you to cater your use of JobDescribe.ai to your personal needs.
                As JobDescribe.ai is developed, more features will be added to make JobDescribe.ai a more powerful tool for everyone to use.</p>
                <br></br>
                <h2 className="descriptionTitle">Who Developed JobDescribe.ai?</h2>
                <p className="description"> JobDescribe.ai is an active project developed by Alden Chico with microservices provided by Mckenzie Bourn.</p>

                {/* Buttons for navigating to other pages on the website */}
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
