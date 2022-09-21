PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window

// PHP script that receives, stores (and will also output) the eye-tracking data
//EyeTrackerURL("PUT YOUR OWN URL HERE")

// We don't want to show the progress bar in this experiment. We can hide the progress bar (which is shown by default) with the following code:
var showProgressBar = false;

// Sequence that determines the order of the elements in this experiment
Sequence("Checks", "Welcome", "Consent", "ProlificID_trial", "WebcamSetUp", "CalibrationSetUp", "Instructions", randomize("Trials"), "QuestionnairePage", "Send", "Final")

// Pre-experimental checks:
PennController("Checks",
    // Does the participant consent that we will use their webcam?
    newText("Consent", "Two short questions before we begin: <br><br> We will use your webcam to collect data on where you are looking on the screen. We will <b> not </b> collect any video data or any other type of data that may reveal your identity. Do you give us permission to use your webcam?<br><br>")
    ,
    newCanvas( "ConsentCanvas", "60vw" , "20vh")
        .settings.add(0,0, getText("Consent"))
        .print("20vw", "20vh")
    ,    
    newButton("yesConsent", "Yes, I give my permission")
    ,
    newButton("noConsent", "No, I don't give my permission")
        .settings.before( getButton("yesConsent") )
        .print("20vw" , "32vh")
    ,
    // A selector element is used to check which of the two buttons is selected.
    newSelector("yesnoConsent")
        .settings.add( getButton("yesConsent") , getButton("noConsent"))
        .wait()
    ,
    // Check which button was selected.            
    getSelector("yesnoConsent")
        .settings.log()
        .test.selected(getButton("yesConsent") )
        // If they press 'no', they are instructed that they cannot participate. If they press 'yes', the experiment continues.
        .failure(
            newCanvas("NoPermision", "60vw" , "20vh").settings.add(0,0, newText("<br><br>Unfortunately you cannot participate in this study. Please close the experiment by closing the browser (you can ignore possible pop-up screens) <br><br>"))
                .print("20vw", "32vh")
            ,
            newButton("waitforever")
                .wait() // The button is not printed, so they're stuck on this page.
        )         
    ,    
    // Does the participant use Google Chrome?  This chunk of script works the same as the previous. 
    newText("Chrome", "This study only works well if you are using the Google Chrome browser on a laptop or desktop computer (so not on a mobile phone or tablet). Are you currently using <b> Google Chrome Desktop </b>? <br><br>")
    ,
    newCanvas( "ChromeCanvas", "60vw" , "20vh")
        .settings.add(0,0, getText("Chrome"))
        .print("20vw", "40vh")
    ,    
    newButton("yesChrome", "Yes, I am currently using Chrome Desktop")
    ,
    newButton("noChrome", "No, I am using another browser/device")
        .settings.before( getButton("yesChrome") )
        .print("20vw" , "50vh")
    ,
    newSelector("yesnoChrome")
    .center()       
        .settings.add( getButton("yesChrome") , getButton("noChrome"))
        .wait()
    ,
    getSelector("yesnoChrome")
        .settings.log()
        .test.selected(getButton("yesChrome") )
        .failure(
            // If they press 'no', they are instructed that they cannot participate. If they press 'yes', the experiment continues.
            newCanvas("WrongBrowser", "60vw" , "20vh").settings.add(0,0, newText("<br><br>Unfortunately, this experiment only works on Google Chrome (which can be downloaded for free). Please close the experiment by closing the browser (you may ignore possible pop-up screens), and come back on Chrome.<br><br>"))
                .print("20vw" , "50vh")
            ,
            newButton("waitforever")
                .wait() // The button is not printed, so they're stuck on this page.
        )      
)

// Here, we present a brief welcome page.
PennController("Welcome",
    newText("WelcomeText", "<p>Welcome and thank you for participating in this experiment! </p><p> </p><p> Cognitive scientists often record eye movements to study human behaviour, because eye movements tell a lot about how we divide our attention and how we make decisions. Typically, cognitive scientists use expensive eye-tracking devices to record where people are looking on a computer screen. The aim of this experiment is to test whether we could also use webcams to achieve this goal. </p><p> </p><p> The task is very simple, and should take you roughly 5-10 minutes to complete: A cross (+) will appear at various positions on your screen. Please look closely at each cross that appears, untill it disappears. We will <b> not </b> collect any video data or any other type of data that may reveal your identity: We only collect data on where on the screen your eyes are looking during the experiment. <br> <br>  Because we will use your webcam to follow your eye movements during this task, it is important that you are in a well-lit and quiet environment. Please turn off your mobile phone or other devices that may distract you during this task. Also, please close other websites that you may have open.</p> <p> If you have any questions about this experiment, feel free to get in touch with me (Mieke Slim) via email: mieke.slim@ugent.be</p>")
    ,           
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("WelcomeText"))       
        .print("20vw", "15vh")         
    ,      
    newButton("Take me to the next page")
        .center()
        .print("center at 50vw", "80vh")
        .wait()
)

// Consent page (this is a default UGent one)
PennController("Consent",
    newText("ConsentText", "<p>This experiment has been approved by the Ethical Comittee from the Faculty of Psychology and Educational Sciences at Ghent University. We request your consent for participation in this experiment. Therefore, please read the following carefully: </p > <p>I declare that I, as a participant in a research project in the Department of Experimental Psychology at Ghent University:<br><br> <ol> <li> have been informed about the research objectives, the questions and the tasks that I will encounter during the research and that I was given the opportunity to receive further information if desired<br><br> </li><li> will participate out of free will in the research project <br><br> </li><li> am aware that the researchers do not collect any personal information that may be used to identify my identity (such as video recordings). All the data that will be collected is completely anonymized; <br><br> </li><li> give informed consent to the researchers to store, process, and report my data in anonymized form <br><br> </li><li> am aware of the option to stop my participation in this research at any moment in time without having to provide a reason; <br><br> </li><li> know that participating or stopping my participation in the research has no negative consequences of any kind for me (apart from not receiving my payment via Prolific) <br><br> </li><li> am aware of the option to ask the researcher(s) for a summary of the results after the study is finished and the results have been known; <br><br> </li><li> agree that my data may be used for further analysis by other researchers after complete anonymization; <br><br> </li><li> am aware that Ghent University is the responsible entity with regards to the personal information collected during the study. I am also aware that the data protection officer can give me more information about the protection of my personal information.</li> </ol> <br>In case you give your informed consent to participate in this study, please click on the button below. If you do not give your informed consent, please close this experiment. </p>")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("ConsentText"))
        .print("20vw", "15vh")
    ,
    newButton("I have read the study information and give my informed consent. Continue to the next page")
            .center()
            .print("center at 50vw", "95vh")
            .wait()
)

// Instructions on the webcam set-up and the calibration procedure. 
newTrial("WebcamSetUp",
    newText("WebcamInstructions", "<p> Before the task begins, we need to calibrate your webcam so the experiment can follow your eye movements. On the next page, a calibration procedure will start. First, you will see the webcam recording on the top left corner of your screen. Please make sure your face is fully visible, and that you sit centrally in front of your webcam by following these instructions:.</p> <p> The next pages will appear in fullscreen. <b> Please do not close the fullscreen for the remainder of this experiment </b></p>")
    ,
    newImage("Instructions", "Instructions.png")
        .size("60vw")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("WebcamInstructions"))
        .settings.add(0,"center at 50%", getImage("Instructions"))
        .print()
    ,
    newButton("Take me to the next page (which will appear in fullscreen)")
        .center()
        .print("center at 50vw", "80vh")    
        .wait( newEyeTracker("tracker").test.ready() ) 
    ,
    fullscreen()
)

// We prompt the calibration procedure. NOTE: The calibration procedure is different than described than in the paper, because the PCIbex developers have updated this procedure since then. The functioning of the calibration procedure is still more-or-less the same. 
newTrial("CalibrationSetUp",
    newText("CalibrationInstructions", "<p>In the calibration procedure, you will see nine circles appear on your screen. Please look at these circles closely as they appear untill they disappear. <br><br> At the end, a new circle will appear in the middle of the screen. Please look at this circle for three seconds. In these three seconds, the webcam eyetracker checks whether it's well calibrated.</p> <p> In case calibration fails, the procedure will be repeated. </p>")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("CalibrationInstructions"))
        .print()    
    ,
    newButton("Begin calibration")
        .center()
        .print("center at 50vw", "80vh")
        .wait( newEyeTracker("tracker").test.ready() )
        .remove()
    ,
    getEyeTracker("tracker").calibrate(5) // '5' is the calibration treshol
        .log()
)

// Present the task instructions.
newTrial("Instructions", 
    newText("TaskInstructions", "<p>You're all set to start the experiment! The task is very simple: Please look closely at all crosses that appear on the screen untill they disappear. <br> <br> You don't have to do anything else during this task, but every now and then a green calibration circle will appear in the middle of your screen. When this happens, look at the circle for three seconds. The webcam will check whether it is still calibrated. If it is, the next trial will automatically start. Otherwise, the calibration procedure will be repeated. <br><br> The task should take roughly 5 minutes.</p>")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("TaskInstructions"))
        .print()    
    ,
    newButton("Go to the first trial").print("center at 50vw", "80vh").wait()
    ,
    newVar("trialsLeftbeforeCalibration", 13) // After 13 trials, we will do a calibration check. Here, we define a variable that keeps track of the number of trials remaining until a calibration check is prompted. 
    .global()   
)

// Start the trials of the experiment
PennController.Template("FixationTrials.csv", // Trials are read of a csv file
    row => PennController("Trials", 
        // The callback commands lets us log the X and Y coordinates of the estimated gaze-locations at each recorded moment in time (Thanks to Jeremy Zehr for writing this function)
            newEyeTracker("tracker",1).callback( function (x,y) {
              if (this != getEyeTracker("tracker")._element.elements[0]) return;
              getEyeTracker("tracker")._element.counts._Xs.push(x);
              getEyeTracker("tracker")._element.counts._Ys.push(y); 
            })
            ,
            newFunction(()=>{
                getEyeTracker("tracker")._element.counts._Xs = [];
                getEyeTracker("tracker")._element.counts._Ys = [];
            }).call()  
            ,
            getVar("trialsLeftbeforeCalibration") // Do we need to do a calibration check?
                .test.is(0)  // if the trialsLeftbeforeCalibration variable (initially defined on line 151) is zero, then the script prompts a calibration check. 
                .success(
                    getEyeTracker("tracker").calibrate(5)
                        .log()
                    ,
                    getVar("trialsLeftbeforeCalibration")
                                .set(13) // once the calibration check has been done, we reset the trialsLeftbeforeCalibration variable at 13 again.
                    )
        ,
        newText("fixationText", "<p>+</p>") // Define the fixation cross
                    .settings.css("font-family", "avenir")
                    .settings.color("black")
        ,
        newCanvas("FixationCross", "15vh", "15vh") // This is the center fixation canvas, presented at the start of each trial. 
            .add("center at 50%" , "middle at 50%" , getText("fixationText").css("font-size", "5vh"))
            .print("center at 50%" , "middle at 50%")
        ,
        newTimer(500) // Wait for 500 ms
            .start()
            .wait()
        ,
        // And print the canvas that contains the target stimulus                  
        newCanvas("trackedCanvas", "10vh", "10vh") // The canvas is slightly smaller than the fixation cross. The fixation cross made weird jumpy movements otherwise. 
            .add( "center at 50%" , "middle at 50%" , getText("fixationText").css("font-size", "15vh"))
            .print(row.X_position, row.Y_position)
        ,
        // Four canvases that specify the four quadrants of the screen.
        newCanvas("Topleft", "50vw", "50vh")  
            .print( "center at 25vw" , "middle at 25vh" )
        ,
        newCanvas("Topright", "50vw", "50vh")  
            .print( "center at 75vw" , "middle at 25vh" )
        ,
        newCanvas("Bottomleft", "50vw", "50vh")  
            .print( "center at 25vw" , "middle at 75vh" )
        ,
        newCanvas("Bottomright", "50vw", "50vh")  
            .print( "center at 75vw" , "middle at 75vh" )
        ,               
        // And launch the eyetracker   
        getEyeTracker("tracker")  
            // The eyetracker tracks the canvases: The "trackedCanvas" contains the target stimulus, the other four canvases specify the four quadrants on the screen.              
            .add(getCanvas("trackedCanvas"), getCanvas("Topleft"), getCanvas("Topright"), getCanvas("Bottomleft"), getCanvas("Bottomright"))  
            .start()
            .log()                
        ,
        // Wait for 1500 ms
        newTimer(1500)
            .start()
            .wait()
        ,
        // And stop the eyetracker to prevent collecting unnecessary data
        getEyeTracker("tracker").stop() 
        ,
        // Trial end: Substract one from the current trialsLeftbeforeCalibration variable
        getVar("trialsLeftbeforeCalibration")
            .set( v => v-1)           
    )   
    // Save the required information in the results file
    .log("Position", row.Position)
    .log("Xpos.absolute", row.X_position) // X position measured in pixels
    .log("Ypos.absolute", row.Y_position) // Y position measured in pixess
    .log("Xpos.relative", row.relXpos) // X position measured in percentage of screen
    .log("Ypos.relative", row.relYpos)  // Y position measured in percentage of screen   
    .log("Xpos", (row.relXpos * window.innerWidth))      // Log the X coordinate of the stimulus in px
    .log("Ypos", (row.relYpos * window.innerHeight))         // Log the Y coordinate of the stimulus in px  
    .log( "ViewportWidth" , window.innerWidth ) // Screensize: width
    .log( "ViewportHeight", window.innerHeight ) // Screensize: heigth          
)

// Present a brief post-experimental questionnaire
PennController("QuestionnairePage",
          //show cursor     
   newFunction( ()=>{
           $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
       });
    }).call()
    ,                  
    newHtml("Questionnaire", "Questionnaire.html") // Questionnaire is presented as an HTML file. 
        .settings.log()
        .print("30vw","15vh")
    ,
    newButton("continue", "Continue")
        .print("center at 45vw","60vh")
        .wait(
            getHtml("Questionnaire").test.complete()
                .failure( getHtml("Questionnaire").warn() )
        )                      
              )       

// Send the results to the server
PennController.SendResults("Send");

// Final page
newTrial("Final",    
    exitFullscreen()
    ,
    newText("Final","This is the end of the experiment. <strong> <br> Thank you for your participation! If you have any questions or if you want to know more about the results, please get in touch with me via mieke.slim@ugent.be")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("Final"))
        .print("22vw", "20vh") 
    ,     
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
         
