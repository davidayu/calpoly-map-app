# calpoly-map-app

Cal Poly Map App is a web application designed to recommend the best spots on campus for eating, studying, and relaxing. With our user-friendly interface, students can view all notable locations, add locations, upvote/downvote locations, filter and search for locations, and add comments to locations.

UI prototype (last updated October 25, 2021): https://www.figma.com/file/sQ51YyO4PbaaNVh6xXr76p/Untitled?node-id=1%3A2 

Developer environment setup: Install Node.js and run 'npm install -g npm' to install npm on your device. Then, run 'npm i'. Next, Navigate to https://github.com/davidayu/calpoly-map-app and clone this repo. Within the backend folder, add a file titled '.env' with the following lines: 
'MONGO_USER="<username>"
MONGO_PWD="<password>"
MONGO_DB="<database_name>"'.
Next, navigate to the frontend folder and add another file titled '.env' with the following line:
'REACT_APP_API_HOST="http://localhost:5000"'. 
Finally from the backend folder, run 'node backend.js' and from a separate terminal, run 'npm start'. The app will be launched in a browser.
    
Remote database: https://cloud.mongodb.com/v2/6176ee4f1887fe5a8e741bbf#clusters

Class diagram (last updated October 22, 2021): https://drive.google.com/file/d/1SU9oplYUWC5pPwjIznS2CK1LfgTxi-UB/view?usp=sharing 

Deployment/component diagram (CHANGE ACCESS TO PUBLIC AND ADD LAST MODIFIED DATE): https://drive.google.com/file/d/1gWzPfoUjDjCIYsWka3lRYPs5e31f6ZOF/view

Code coverage report: (last updated Dec 3, 2021): 

File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                    
---------------------|---------|----------|---------|---------|------------------------------------------------------
All files            |   85.71 |       50 |     100 |   85.71 |                                                      
 comment-services.js |   89.65 |    33.33 |     100 |   89.65 | 25-40,67,87-88                                       
 comment.js          |     100 |      100 |     100 |     100 |                                                      
 pin-services.js     |   82.47 |    58.33 |     100 |   82.47 | 25-40,76,113-116,128-131,144-145,156-157,168-169,177 
 pin.js              |     100 |      100 |     100 |     100 |                                                      

Test Suites: 2 passed, 2 total
Tests:       34 passed, 34 total
Snapshots:   0 total
Time:        4.293 s
Ran all test suites.
