# JobDescribe.ai
JobDescribe.ai is a web-tool that generates job descriptions powered by OpenAI's API. To use JobDescribe.ai, the user simply enters a career field that they're interested in and a US state as a location, and JobDescribe.ai generates information related to the job and location that the user entered. Information such as day-to-day job descriptions, relavent job skills, job listing websites, educational requirements, and educational institutions are all generated in real-time using OpenAI to produce useful information that the user can utilize for their situational awareness.
</br></br>
To try out JobDescribe.ai for yourself, follow these steps:
<ol>
<li>Download my project code from GitHub.</li>
<li>Copy .env.example from the backend directory and save the copy in the backend directory as filename .env. Enter your OpenAI API Key in the .env file <i>(Sign up for an OpenAI account and create an OpenAI key <a href="https://platform.openai.com/overview">here</a>).</i></li>
<li>Open a terminal window. Navigate to the backend directory and run npm init. This will download all the node module dependencies for backend. After all the dependencies are downloaded, run npm start to run the backend server code (jobdescribe-controller.mjs) file in the background (on port 3000).</li>
<li>Open another terminal window. Navigate to the frontend directory and run npm init. This will download all the node module dependencies for backend. After all the dependencies are downloaded, run npm start to run the frontend website on localhost port 8000.</li>
</ol>
</br>
JobDescribe.ai is a personal project that I created to learn more about how OpenAI can be used to integrate into my future personal projects and I hope by making the project open source, others can learn how they can use OpenAI for their projects as well.
