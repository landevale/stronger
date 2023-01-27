<a name="readme-top"></a>

# Stronger

<div id="header" align="center">
  <a href="https://github.com/landevale/stronger">
   <img src="https://64.media.tumblr.com/4350be4b260a88a0363620a91c101194/tumblr_nmhh1od1151urg2hno1_500.gif" width="400"/>
  </a>

  <h3 align="center">Stronger - Exercise Finder & Workout Tracker</h3>

  <p align="center">
    Track your progress, reach your goals with Stronger - the ultimate workout companion.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#development-approach">Development Approach</a>
      <ul>
        <li><a href="#user-stories">User Stories</a></li>
        <li><a href="#thought-process">Thought Process</a></li>
         <li><a href="#wireframe">Wireframe</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#future-developments">Future Developments</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center">
<img src="https://i.imgur.com/tD4hnm5.png" width="200"/>
</div>

This project is a full-stack web application that allows users to find exercises and create workout logs. The application is built using the MERN stack (MongoDB, Express.js, React, and Node.js).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Frameworks/libraries used:

- The frontend of the application is built using React
- Form and validation using Formik & Yup
- Styled with Material UI
- The backend of the application is built using Node.js and Express.js, with MongoDB as the database.
- User authentication and authorization implemented using Google Identity Services and JSON web token (JWT).
- The application is deployed on Cyclic

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Development Approach -->

## Development Approach

This is how I approached the project.

### User Stories

1. As a user, I want to be able to search for exercises by muscle group, so that I can find specific exercises to target.
2. As a user, I want to be able to view information about an exercise, including equipment needed, so that I can properly perform the exercise.
3. As a user, I want to be able to create/view workout logs, including the exercises I performed, the weight and reps, and the date, so that I can track my progress over time.

### Thought Process

When creating this application, the main focus was to create a user-friendly interface for finding exercises and tracking progress.<br/>
The search feature allows users to easily find specific exercises by muscle group & equipment required, and the detailed exercise information ensures that the user can perform the exercise correctly.<br/>
The workout log feature allows users to track their progress over time, and the ability to view workout logs allows users to see their progress.
<br/><br/>
The database structure was designed to store exercises, workout logs, and user information. MongoDB was chosen as the database technology because of its flexibility and scalability. The exercise and workout log data is stored in separate collections, with each exercise having a unique ID that is referenced in the workout log.
<br/><br/>
Authentication and authorization were implemented using a combination of Google identity services and JSON Web Token (JWT). Users can log in using their Google account and a JWT is issued upon successful authentication. The JWT is then passed in the header of subsequent requests to the backend, allowing the server to authenticate the user and authorize access to protected routes and resources.
<br/><br/>
Overall, the goal was to create a robust and scalable application that is easy to use, and that allows users to find exercises and track their progress in an effective and efficient way.

### Wireframe

<div align="center"><img src="https://i.imgur.com/JFb8CDo.png"/></div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<div class="row">
<img src="https://i.imgur.com/FPbsp6A.png"  width="200"/>
<img src="https://i.imgur.com/q2Ony2J.png"  width="200"/> 
<img src="https://i.imgur.com/CZsP2ti.png"  width="200"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE DEVELOPMENTS -->

## Future Developments

- [ ] Add YouTube search API for each exercise
- [ ] Add default KG/lbs
- [ ] Add default rest timer
- [ ] Add Rating of Perceived Exertion (RPE) & 1 Rep Max (1RM) calculations
- [ ] Add history and charts of most weight lifted
- [ ] Add additional routine templates
- [ ] Implementing a social feature that allows users to share their workout logs with others

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://nervous-hen-purse.cyclic.app/](https://nervous-hen-purse.cyclic.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
