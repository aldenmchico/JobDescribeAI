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

  // State variables / method that is used to share data between Home Page and Descriptions Page
  const [descriptions, setDescriptions]             = useState([]);
  const [jobTitle, setJobTitle]                     = useState();
  const [submitJobTitle, setSubmitJobTitle]         = useState();
  const [options, setOptions]                       = useState([  
                                                                  'Daily Work',
                                                                  'Educational Requirements',
                                                                  'Salary Information'
                                                              ]);
                                                            
  const [isJobTitle, setIsJobTitle]                 = useState(false);
  return (
    <>
      <Router>
        <div className="container">
          <header>
            <h1 className="websiteName">JobDescribe.ai</h1>
            <p className="headerDescription">Learn About Your Next Passion.</p>
          </header>

          <main>

            
            <Route path="/" exact>
              <HomePage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} submitJobTitle={submitJobTitle} setSubmitJobTitle={setSubmitJobTitle} 
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} options={options}/>
            </Route>
            
            
            <Route path="/descriptions">
              <DescriptionsPage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} submitJobTitle={submitJobTitle} setSubmitJobTitle={setSubmitJobTitle} 
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} descriptions={descriptions} options={options}/>
            </Route>

            <Route path="/job-not-found">
              <JobNotFoundPage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} submitJobTitle={submitJobTitle} setSubmitJobTitle={setSubmitJobTitle}
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} options={options}/>
            </Route>
            
            
            <Route path="/customize-page">
              <CustomizePage isJobTitle={isJobTitle} setIsJobTitle={setIsJobTitle} setSubmitJobTitle={setSubmitJobTitle} 
                jobTitle={jobTitle} setJobTitle={setJobTitle} setDescriptions={setDescriptions} options={options} setOptions={setOptions}/>
            </Route>

            <Route path="/about">
              <AboutPage/>
            </Route>
            
            
            </main>

          {/*
          <div className="navigation">
            <Navigation />
          </div>
           */}

          <footer>
            <p>&copy; 2022 Alden Chico</p>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
