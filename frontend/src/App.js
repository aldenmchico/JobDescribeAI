// Import React ES Modules
import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import stylesheet
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import DescriptionsPage from './pages/DescriptionsPage'
import JobNotFoundPage from './pages/JobNotFoundPage'
import CustomizePage from './pages/CustomizePage'
import AboutPage from './pages/AboutPage';

function App() {

  // State variables / methods that are used to share data between all of the website's pages
  const [descriptions, setDescriptions]             = useState([]);
  const [jobTitle, setJobTitle]                     = useState();
  const [submitJobTitle, setSubmitJobTitle]         = useState();
  const [options, setOptions]                       = useState([  
                                                                  'Daily Work',
                                                                  'Educational Requirements',
                                                                  'Salary Information'
                                                              ]);                                                           
  const [isJobTitle, setIsJobTitle]                 = useState(false);
  const [didGenerate, setDidGenerate]               = useState(false);                                                          

  return (
    <>
      <Router>
        <div className="container">
          <header>
            <h1 className="headerWebsiteName">JobDescribe.ai</h1>
            <p className="headerDescription">Learn About Your Next Passion.</p>
          </header>

          <main>

            
            <Route path="/" exact>
              <HomePage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} submitJobTitle={submitJobTitle} setSubmitJobTitle={setSubmitJobTitle} 
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} options={options} didGenerate={didGenerate}/>
            </Route>
            
            
            <Route path="/descriptions">
              <DescriptionsPage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} submitJobTitle={submitJobTitle} setSubmitJobTitle={setSubmitJobTitle} 
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} descriptions={descriptions} options={options} 
                setDidGenerate={setDidGenerate}/>
            </Route>

            <Route path="/job-not-found">
              <JobNotFoundPage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} submitJobTitle={submitJobTitle} setSubmitJobTitle={setSubmitJobTitle}
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} options={options} didGenerate={didGenerate}/>
            </Route>
            
            
            <Route path="/customize-page">
              <CustomizePage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} setSubmitJobTitle={setSubmitJobTitle} 
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} options={options} setOptions={setOptions} didGenerate={didGenerate}/>
            </Route>

            <Route path="/about">
              <AboutPage/>
            </Route>
            
            
            </main>

          <footer>
            <p>&copy; 2022 Alden Chico</p>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
