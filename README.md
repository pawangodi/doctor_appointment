To run this application in your system first run backend and then move to front end . you may directly run front end but you not gain all its features and functionality.
Note- For all the application you must be have node in your machine.
Backend Setup--(TO run this app in your Local system)

step_1- first create one doctor_appointment folder in your VS code or any editer .
       using command mkdir doctor_appointment  then cd doctor_appointment
step_2- Now you have to have this app by using git clone command -copy [patse the below command on your terminal.
       git clone https://github.com/pawangodi/doctor_appointment.git
step_3- now move to backend by cd backend 
step_4   enter command npm i which install all the dependency for the backend application
step_5 for running the backend you have to first configure your .env file
       where you found MONGODB_URI - you have to create your own MongoDb database connection string 
       follow this step please prefer chat GPT if you are new  enyer this query on chat GPT then you found step by step aproach
       query--"Write step by step approach to create mongoDb connection string for beginer" 
 step_6 Now you have to steup yuor cloudinary which provide accessible online link for uploaded image. you can use this query over chat GPT.
       query --go to .env file copy cloudinary setup  and pste over CHAT GPT and make query "please help me  to get all this value explain step by step "
       
step_7 After following all this steps your environment steup is ready for running the backend , run this command 
     npm run start server 
