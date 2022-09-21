// Experiment code for Slim & Hartsuiker's Experiment 2
// Author: Mieke Sarah Slim

// This expriment is a replication of Dijkgraaf, Hartsuiker, and Duyck's (2017) visual world experiment. 
// The participants passively listen to sentences while they look at four images, arranged in the four quadrants of the display.

// Please note that this script requires some understanding of how PCIbex works.
// If you want to use this script, it is highly recommended to first study the PCIbex documentation, go through both the basic and advanced tutorials, and study the how-to guide on collecting eye tracking data written by the PCIbex developers (all avalable on https://doc.pcibex.net/).

PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window

// Resources are hosted on a distant server. 
// NOTE: It is highly recommended to store the resources in ZIP files (https://doc.pcibex.net/how-to-guides/managing-resources/). Unfortunately, the UGent servers do not allow this functionality.
AddHost("https://users.ugent.be/~mslim/VW_Stimuli_onserver/");

// PHP script that receives, stores (and will also output) the eye-tracking data (see https://doc.pcibex.net/how-to-guides/collecting-eyetracking-data/)
// EyeTrackerURL("PUT YOUR OWN URL HERE")

// We don't want to show the progress bar in this experiment. We can hide the progress bar (which is shown by default) with the following code:
var showProgressBar = false;

// Sequence of the elements in the experiment
Sequence("Preload", "Loading", "WebcamCheck", "ChromeCheck", "L1Check", "Welcome", "Consent", "WebcamSetUp", "FailedCalibrationLink", "AudioSetUp", "AudioCheck", "Instructions", "PractiseSession", "EndOfPractise", "Counter", randomize("Block1"), "BlinkBreak", "AudioSetUp2", randomize("Block2"), "LanguageQuestionnairePage", "WebcamQuestionnairePage", "Send", "FinalPage")

// Check preload of required files:
CheckPreloaded("Preload")

// Below is a fake loading page. I added this because the first page was often a bit glitchy, and this way, there is more loading time. Note that this is a quick-'n-dirty fix though.
newTrial("Loading",
    newText("Loading", "Loading...")
        .center()
        .print()
    ,
    // After a 1000 ms, a continue button is printed.
    newTimer(1000)
        .start()
        .wait()
    ,
    getText("Loading")
        .remove()
    ,
    newText("Continue", "Click on the button below to start the experiment!")
        .center()
        .print()
    ,
    newButton("ContinueButton", "Continue to the experiment")
        .center()
        .print()
        .wait()
)


// We ask the participants whether they give permission to use the webcam (even though the same question should have been promted by the browser), whether they are on Chrome, and whether they speak English as an L1. If they answer 'no' on any of these questions, they cannot continue to the experiment. 
newTrial("WebcamCheck",
    newText("PermissionWebcam", "Three brief questions before we begin:<br><br>We need to use your webcam to record where you are looking on the screen. We will <b>not</b> record any video or collect any other type of data that may reveal your identity. Do you give us permission to use your webcam?")
    ,
    // They indicate their response with a keyboard press
    newText("NoPermission", "No, I do not give my permission<br>Press the 'J' key")
    ,
    newText("YesPermission", "Yes, I give my permission,<br>Press the 'F' key")
    ,
    newCanvas("ChecksCanvas", "60vw" , "20vh")
        .add("center at 50%", "top at 10%", getText("PermissionWebcam"))
        .add("center at 20%", "top at 80%", getText("YesPermission"))
        .add("center at 80%", "top at 80%", getText("NoPermission"))
        .print("center at 50%", "top at 25%") 
    ,
    // Implement the keyboard response keys
    newKey("yesno", "FJ")
        .wait()
    ,
    // And check which key was pressed
    getKey("yesno")
        // If they select yes ('F'), the experiment continues. If they select no 'J', they are send to a page that says that they cannot participate in the experiment.
        .test.pressed("F")
        .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoPermision", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately you cannot participate in this study. Please close the experiment by closing the browser (you can ignore possible pop-up screens)"))
                .print("center at 50%", "top at 25%") 
            ,
            newButton("waitforever") // The button is never printed, so they're stuck on this page.
                .wait()
        )
)

// The following section works the same as the 'WebcamCheck' section
newTrial("ChromeCheck",
    newText("ChromeCheckText", "Three brief questions before we begin:<br><br>This study only works well if you are using the Google Chrome browser on a laptop or desktop computer (so not on a mobile phone or tablet). Are you currently using <b> Google Chrome Desktop </b>?")
    ,
    newText("NoChrome", "No, I am using another browser/device<br>Press the 'J' key")
    ,
    newText("YesChrome", "Yes, I am currently using Chrome Desktop<br>Press the 'F' key")
    ,
    newCanvas("ChecksCanvas", "60vw" , "20vh")
        .add("center at 50%", "top at 10%", getText("ChromeCheckText"))
        .add("center at 20%", "top at 80%", getText("YesChrome"))
        .add("center at 80%", "top at 80%", getText("NoChrome"))
        .print("center at 50%", "top at 25%") 
    ,
    newKey("yesno", "FJ")
        .wait()
    ,
    getKey("yesno")
        .test.pressed("F")
            .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoChrome", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately, this experiment only works on Google Chrome (which can be downloaded for free). Please close the experiment by closing the browser (you may ignore possible pop-up screens), and come back on Chrome."))
                .print("center at 50%", "top at 25%") 
            ,
            newButton("waitforever")
                .wait()
        )
)

// The following section works the same as the 'WebcamCheck' section
newTrial("L1Check",
    newText("L1CheckText", "Three brief questions before we begin:<br><br>To participate in this study, it is required that you are a <b>native speaker of English</b>. Are you a native speaker of English?")
    ,
    newText("NoL1", "No, I am not a native speaker of English<br>Press the 'J' key")
    ,
    newText("YesL1", "Yes, English is my first language<br>Press the 'F' key")
    ,
    newCanvas("ChecksCanvas", "60vw" , "20vh")
        .add("center at 50%", "top at 10%", getText("L1CheckText"))
        .add("center at 20%", "top at 80%", getText("YesL1"))
        .add("center at 80%", "top at 80%", getText("NoL1"))
        .print("center at 50%", "top at 25%") 
    ,
    newKey("yesno", "FJ")
        .wait()
    ,
    getKey("yesno")
        .test.pressed("F")
            .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoL1", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately, you are not eligible to participate in this study. Please close the experiment by closing the browser (you may ignore possible pop-up screens)."))
                .print("center at 50%", "top at 25%") 
            ,
            newButton("waitforever")
                .wait()
        )
)

// Here, a welcome screen is presented to the participant.
newTrial("Welcome",
    newHtml("downloadspeed", "speedtest.html") // This is a brief download speed test (written in HTML). This test is repeated throughout the experiment. 
        .settings.log()
        .print("center at 50%", "middle at 50%")
    ,
    newTimer(100)
        .start()
        .wait()
    ,
    getHtml("downloadspeed")
        .remove()
    ,
    newVar("Subject", randomnumber = Math.floor(Math.random()*1000000))
        .global()
        .log()
    ,
    newText("WelcomeText", "Welcome and thank you for participating in this experiment.<br><br>Cognitive scientists often record eye movements to study human behavior, because eye movements tell a lot about how we divide our attention and how we make decisions. Typically, expensive eye-tracking devices are used to record eye movements. The aim of this experiment is to test whether we could also use webcams to achieve this goal. <br><br>The task is very simple and should take roughly 25-30 minutes to complete (there will be a break in the middle). All you have to do is listen to short sentences while four images are presented on your computer screen. Feel free to look anywhere, as long as it is on your computer screen. Your webcam will be used to follow your eye movements on the task. <br><br>We will <b>not</b> collect any video data or any other type of data that may reveal your identity. We only collect data on where on the screen your eyes are looking during the experiment.<br><br>Unfortunately, the experiment may not work for everyone: Sometimes the webcam is not able to pick up your eye movements (for a variety of possible reasons). We will test in a moment whether the experiment works for you. In case it doesn’t, you will be redirected to another experiment in which you will judge English sentences (which doesn't require a webcam). <br><br> It is important that you are in a well-lit and quiet environment, otherwise the webcam may not be able to pick up your eye movements. Please turn off any devices or applications that may distract you during this task (such as your mobile phone or your email application) and please close other websites that you may have open.<br><br>If you have any questions about this experiment, feel free to get in touch with me (Mieke Slim) via email: mieke.slim@ugent.be <br><br> Press <b>SPACE</b> to continue. <br><br>The next pages will appear in fullscreen. <b>Please do not close the fullscreen for the remainder of this experiment. </b>")
    ,
    newCanvas("InstructionsCanvas", "60vw" , "20vh")
        .add(0,0, getText("WelcomeText"))
        .print("center at 50%", "top at 25%") 
    ,
    newKey("next", " ")
        .wait()
)

// The informed consent is presented to the participant. The form is written in HTML -- this is a relatively standard UGent one
newTrial("Consent",
    newHtml("consent_form", "consent.html")
        .center()
        .cssContainer({"width":"720px"})
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Click to continue")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
    ,
    fullscreen()
)

// Instructions on how to set up the webcam and calibrate the eyetracker are shown.
PennController("WebcamSetUp",
    newText("WebcamSetUpText", "The next pages will help you set up the audio and webcam. The webcam will be set up in a simple calibration procedure. During this calibration, you will see a video of your webcam stream. Again, we will not save any recordings of this video stream. Please make sure your face is fully visible, and that you sit centrally in front of your webcam by following the instructions in the picture below.<br><br>You can start the calibration procedure by clicking on the start button that will appear on the middle of the screen.<br><br>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and <b>look at it for three seconds</b> so the algorithm can check whether it's well calibrated.<br><br>In case calibration fails, the last step will be repeated. <br><br><b>If calibration fails three times in a row</b>, you won't be able to complete the experiment. If this happens, please click on the link that will be provided to you, so you will be redirected to another experiment that doesn't require a webcam. <br><br> Press <b>SPACE</b> to continue to the next trial")
    ,
    newImage("Instructions", "Instructions.png")
        .size("60vw")
    ,
    newCanvas("InstructionsCanvas", "60vw" , "20vh")
        .add(0,0, getText("WebcamSetUpText"))
        .print("center at 50%", "top at 25%") 
    ,
    getImage("Instructions")
        .print("center at 50%", "top at 65%")
    ,
    newKey("next", " ")
        .wait( newEyeTracker("tracker").test.ready())
    ,
    getCanvas("InstructionsCanvas")
        .remove()
    ,
    getImage("Instructions")
        .remove()
    ,
    newVar("Failed", "no")
        .global()
    ,
    fullscreen()
    ,
    //  Launch the calibration procedure
    getEyeTracker("tracker")
        .showFeedback()
        .calibrate()
    //    .test.score(50) // The calibration treshold is set at 50. They have three attempts to reach this treshold. 
    .test.score(1)
            .failure(
                newText("FailedCalibration1","Unfortunately, the calibration failed. Make sure to look at the button in the centre of the screen for three seconds. <br> Press space to try again! <br> Attempts left: 2")
                    .print("center at 50%", "middle at 50%")
                ,
                newKey("next", " ")
                    .wait()
                ,
                getText("FailedCalibration1").remove()
                ,
                getEyeTracker("tracker")
                    .calibrate()
    //                .test.score(50)
                    .test.score(1)
                        .failure(
                            newText("FailedCalibration2","Unfortunately, the calibration failed. Make sure to look at the button in the centre of the screen for three seconds. <br> Press space to try again! <br> Attempts left: 1")
                                .print("center at 50%", "middle at 50%")
                            ,
                            newKey("next", " ")
                                .wait()
                            ,
                            getText("FailedCalibration2").remove()
                            ,
                            getEyeTracker("tracker")
                                .calibrate()
                            //    .test.score(50)
                            .test.score(1)
                                    .failure(
                                    getVar("Failed")
                                        .set("yes")
                                    ,
                                    newTimer(5)
                                        .start()
                                        .wait()
                        )
                    )
                )
)

// If calibration failed three times, the participants were redirected to another experiment (below is a dummy link)
newTrial("FailedCalibrationLink",
    getVar("Failed")
        .test.is("yes")
        .success(
            getVar("Subject")
                .log()
            ,
            newHtml("downloadspeed", "speedtest.html")
                .settings.log()
                .print("center at 50%", "middle at 50%")
            ,
            newTimer(5)
                .start()
                .wait()
            ,
            getHtml("downloadspeed")
                .remove()
            ,
            SendResults()
            ,
            newText("FailedCalibration","Unfortunately, the calibration failed again. It seems that the webcam is not able to pick up your eye movements. Please visit this link to be redirected to another survey that doesn't require the webcam: <b>dummy link</b> (please ignore the pop-up window that may appear, you can click on 'leave'). </p> </strong> <br> Thank you for your participation! If you have any questions or if you want to know more about the results, please get in touch with me via mieke.slim@ugent.be")
                .print("Center at 50%", "Middle at 50%")
            , 
            newButton("waitforever").wait()
            )
    
    )
    
// Now, we set up the audio, allowing participants to adjust their volume
PennController("AudioSetUp",
    newText("AudioInstructions", "Now that you have set up and calibrated the webcam, let’s set up the audio. In this experiment, you will hear a number of sentences. You can play one of the sentences that will be used in the experiment by clicking the play button below. Please use this audio recording to adjust your volume. Feel free to replay this sentence as often as you need. Once you’re ready, you can go to the next page.")
    ,
    newAudio("Volume_sentence", "practice_engels_Sarah_Mary_hits_a_boy_2_ok.wav") // This is an unused practice recording
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioInstructions"))
        .settings.add("center at 50%", "top at 20%", getAudio("Volume_sentence"))
        .print("center at 50%", "top at 25%") 
    ,
    newButton("Take me to the next page")
        .center()
        .print("center at 50%", "top at 70%") 
        .wait()
)

// Now we want to check whether the participants indeed hear the audio correctly. They hear a new sentence, and are asked to write that sentence down. 
newTrial("AudioCheck",
    newText("AudioCheckUp", "Now that the audio volume is set, please listen to the audio file presented below. After you listened to the sentence, please type in the sentence you heard in the field that appears.<br><br>Please listen carefully, because <b>you can only listen to the sentence once.</b><br><br> Feel free to move your head if you want to look at your keyboard while typing. ")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioCheckUp"))
        .print("center at 50%", "top at 25%")
    ,    
    newAudio("Check_sentence", "practice_engels_Sarah_Mary_has_a_diamond_ok.wav") // Another unused practice recording.
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
        .remove()
    ,
    newTextInput("AudioCheckInput", "Type in the sentence you heard") // Text input to type in the sentence. 
            .center()
            .log()
            .lines(0)
            .size(400, 50)
            .print("center at 50%", "top at 40%")
    ,  
    newButton("Take me to the next page")
        .print("center at 50%", "top at 45%")
        .wait()
)

// And we present the task instructions. 
newTrial("Instructions", 
    newHtml("downloadspeed", "speedtest.html")
        .settings.log()
        .print("center at 50%", "middle at 50%")
    ,
    newTimer(100)
        .start()
        .wait()
    ,
    getHtml("downloadspeed")
        .remove()
    ,
    newText("TaskInstructions", "<p>You're all set to start the experiment! You will hear a couple of short sentences while you look at the screen. Feel free to look anywhere, as long as it's on the screen.<br><br>Before each trial, you will see a button in the middle of your screen. Click on this button and look at it for three seconds. The webcam will check whether it is still calibrated. If it is, the trial will automatically start after three seconds. Otherwise, the calibration procedure will be repeated. <br><br>During the trials, you don't need to click on anything: Just listen and watch! <br><br>We’ll first start with two practice trials, so you will know how the experiment works. Then, we will continue to the experiment. This experiment should take roughly 20 minutes to complete, and there will be a break in the middle.<br><br>Please make sure you keep your head as still as possible throughout the experiment (of course, with the exception of the break)<br><br><b>If you experience any technical difficulties</b> during this experiment (for instance, resources not loading or the experiment freezing), don't hesitate to get in touch with me (mieke.slim@ugent.be)!")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add(0,0, getText("TaskInstructions"))
        .print("center at 50%", "top at 25%")   
    ,
    newButton("Take me to the practise trials")
        .center()
        .print("center at 50%", "top at 70%")
        .wait()
)
  
// We start with two practice trials
Template("Practise.csv", row => // The practice trial info is retrieved from a csv file
    newTrial("PractiseSession",
        newHtml("downloadspeed", "speedtest.html")
            .settings.log()
            .print("center at 50%", "middle at 50%")
        ,
        newTimer(10)
            .start()
            .wait()
        ,
        getHtml("downloadspeed")
            .remove()
        ,
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
        // Show the mouse cursor (needed if calibration fails)
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        getEyeTracker("tracker")
            .test.score(1) //.calibrate(50)  // Each trial starts with a calibration check to see whether the treshold of 50 is still reached. 
            .log()  // log the calibration scores
        ,
        // Hide the mouse cursor
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'none'
           });
        }).call()
        ,
        defaultImage.size("20vh", "20vh") // Images are this size (note that they are a square)
        ,
        images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random()) // We positioning of the four images is random. This function is needed for the randomization. It makes an array of the four picture files, and shuffles this array.
        ,
        newCanvas("TopLeft", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[0])) // retrieve the first image from the shuffled array
            .print("center at 25%", "middle at 25%")
            .log() 
        ,
        newCanvas("BottomLeft", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[1])) // retrieve the second image from the shuffled array
            .print("center at 25%", "middle at 75%")
            .log() 
        ,
        newCanvas("TopRight", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[2])) // retrieve the third image from the shuffled array
            .print("center at 75%", "middle at 25%")
            .log() 
        ,
        newCanvas("BottomRight", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[3])) // retrieve the fourth image from the shuffled array
            .print("center at 75%", "middle at 75%")
            .log() 
        ,
        newTimer(2200).start().wait() // 2200 ms preview time
        ,
        // start the eyetracker
        getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
            .add(   // We track the Canvas elements   
                getCanvas("TopLeft"),
                getCanvas("BottomLeft"),
                getCanvas("TopRight"),
                getCanvas("BottomRight") 
            )
            .log()
            .start()
        ,
        // play the audio
        newAudio("sentence", row.audio)
            .log()
            .play()
            .wait()
        ,
        // add 500 ms overspill time after the audio has finished playing
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop the eyetracker to prevent collecting unnecessary data
        ,
        // check whether the audio has indeed stopped playing
        getAudio("sentence").wait("first")
        ,
        // 200 ms overspill time 
        newTimer(200).start().wait()
        ,
        // relaunch fullscreen (which only has an effect if the participant closed the fullscreen for whatever reason)
        fullscreen()
        )
    // save the required trial info in the results file 
    .log("Subject"              , getVar("Subject")         )
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log( "toplefttimage"       , images[0]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomleftimage"     , images[1]                 ) // save which image is printed here (since the array was shuffled)
    .log( "toprightimage"       , images[2]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomrightimage"    , images[3]                 ) // save which image is printed here (since the array was shuffled)
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )     
    .log( "list"                , row.list                  )
    .log( "stimulusset"         , row.pair                  )
    .log( "ViewportWidth"       , window.innerWidth         ) // Screensize: width
    .log( "ViewportHeight"      , window.innerHeight        ) // Screensize: heigth     
)

// Page that tells the participants that the practice trials are over and the experiment will begin. 
newTrial("EndOfPractise", 
    //show cursor     
    newFunction( ()=>{
        $("body").css({
            width: '100vw',
            height: '100vh',
            cursor: 'default'
           });
        }).call()
    ,
    newText("EndOfPractiseText", "Those were the two practice trials. Please click on the button below to start the experiment.")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add("center at 50%",0, getText("EndOfPractiseText"))
        .print("center at 50%", "top at 25%")   
    ,
    newButton("Start the experiment")
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
)

// We use the counter to assign lists to participants. The counter is increased here (so if people cannot continue to the experiment due to calibration issues or because they quit, we will hopfully still get a similar number of participants in each list)
SetCounter("Counter", "inc", 1);

// And we start the trials in Block 1 - Note that this section is a copy from the practice trials (with the exeption of the csv file name)
Template("Block1.csv", row => // Again, the trial info is stored in a csv file
    newTrial("Block1",
         newHtml("downloadspeed", "speedtest.html")
            .settings.log()
            .print("center at 50%", "middle at 50%")
        ,
        newTimer(10)
            .start()
            .wait()
        ,
        getHtml("downloadspeed")
            .remove()
        ,
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
        // Show the mouse cursor (needed if calibration fails)
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        getEyeTracker("tracker")
            .calibrate(1) //.calibrate(50)  // Each trial starts with a calibration check to see whether the treshold of 50 is still reached. 
            .log()  // log the calibration scores
        ,
        // Hide the mouse cursor
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'none'
           });
        }).call()
        ,
        defaultImage.size("20vh", "20vh") // Images are this size (note that they are a square)
        ,
        images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random()) // We positioning of the four images is random. This function is needed for the randomization. It makes an array of the four picture files, and shuffles this array.
        ,
        newCanvas("TopLeft", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[0])) // retrieve the first image from the shuffled array
            .print("center at 25%", "middle at 25%")
            .log() 
        ,
        newCanvas("BottomLeft", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[1])) // retrieve the second image from the shuffled array
            .print("center at 25%", "middle at 75%")
            .log() 
        ,
        newCanvas("TopRight", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[2])) // retrieve the third image from the shuffled array
            .print("center at 75%", "middle at 25%")
            .log() 
        ,
        newCanvas("BottomRight", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[3])) // retrieve the fourth image from the shuffled array
            .print("center at 75%", "middle at 75%")
            .log() 
        ,
        newTimer(2200).start().wait() // 2200 ms preview time
        ,
        // start the eyetracker
        getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
            .add(   // We track the Canvas elements   
                getCanvas("TopLeft"),
                getCanvas("BottomLeft"),
                getCanvas("TopRight"),
                getCanvas("BottomRight") 
            )
            .log()
            .start()
        ,
        // play the audio
        newAudio("sentence", row.audio)
            .log()
            .play()
            .wait()
        ,
        // add 500 ms overspill time after the audio has finished playing
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop the eyetracker to prevent collecting unnecessary data
        ,
        // check whether the audio has indeed stopped playing
        getAudio("sentence").wait("first")
        ,
        // 200 ms overspill time 
        newTimer(200).start().wait()
        ,
        // relaunch fullscreen (which only has an effect if the participant closed the fullscreen for whatever reason)
        fullscreen()
        )
    // save the required trial info in the results file 
    .log("Subject"              , getVar("Subject")         )
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log( "toplefttimage"       , images[0]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomleftimage"     , images[1]                 ) // save which image is printed here (since the array was shuffled)
    .log( "toprightimage"       , images[2]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomrightimage"    , images[3]                 ) // save which image is printed here (since the array was shuffled)
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )     
    .log( "list"                , row.list                  )
    .log( "stimulusset"         , row.pair                  )
    .log( "ViewportWidth"       , window.innerWidth         ) // Screensize: width
    .log( "ViewportHeight"      , window.innerHeight        ) // Screensize: heigth     
)

// Break between the blocks
PennController("BlinkBreak",
   //show cursor     
   newFunction( ()=>{
    $("body").css({
        width: '100vw',
        height: '100vh',
        cursor: 'default'
           });
        }).call()
    ,     
    newText("BlinkBreakText", "This was the first block! Feel free to take a five minute break. Please make sure that this break is not much longer than five minutes. <br><br> Click on the button below to continue to the final block of the experiment.<br><br> Make sure you are centrally seated before your webcam and to keep your head still throughout the remainder of this experiment.")
    ,           
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("BlinkBreakText"))       
        .print("center at 50%", "middle at 50%")         
    ,      
    newButton("Take me to the next block (which will appear in fullscreen again)")
        .print("center at 50%", "top at 45%")
        .wait()
    ,
    fullscreen()
)

// Set-up the audio again
PennController("AudioSetUp2",
    newText("AudioInstructions", "You can use this audio recording, in case you need to adjust the volume again for the second block. Feel free to replay this sentence as often as you need.")
    ,
    newAudio("Volume_sentence", "practice_engels_Sarah_Mary_hits_a_boy_2_ok.wav")
    ,
    newCanvas( "myCanvas", 600 , 300)
        .settings.add(0,0, getText("AudioInstructions"))
        .settings.add("center at 50%", "top at 20%", getAudio("Volume_sentence"))
        .print("center at 50%", "top at 25%") 
    ,
    newButton("Continue to the next block")
        .print("center at 50%", "top at 60%") 
        .wait( newEyeTracker("tracker").test.ready() )
)

// And we preent the trials in Block 2 - Like Block 1, this section is a copy from the practice trials (with the exeption of the csv file name)
Template("Block2.csv", row =>
    newTrial("Block2",
         newHtml("downloadspeed", "speedtest.html")
            .settings.log()
            .print("center at 50%", "middle at 50%")
        ,
        newTimer(10)
            .start()
            .wait()
        ,
        getHtml("downloadspeed")
            .remove()
        ,
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
        // Show the mouse cursor (needed if calibration fails)
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        getEyeTracker("tracker")
            .calibrate(1) //.calibrate(50)  // Each trial starts with a calibration check to see whether the treshold of 50 is still reached. 
            .log()  // log the calibration scores
        ,
        // Hide the mouse cursor
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'none'
           });
        }).call()
        ,
        defaultImage.size("20vh", "20vh") // Images are this size (note that they are a square)
        ,
        images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random()) // We positioning of the four images is random. This function is needed for the randomization. It makes an array of the four picture files, and shuffles this array.
        ,
        newCanvas("TopLeft", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[0])) // retrieve the first image from the shuffled array
            .print("center at 25%", "middle at 25%")
            .log() 
        ,
        newCanvas("BottomLeft", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[1])) // retrieve the second image from the shuffled array
            .print("center at 25%", "middle at 75%")
            .log() 
        ,
        newCanvas("TopRight", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[2])) // retrieve the third image from the shuffled array
            .print("center at 75%", "middle at 25%")
            .log() 
        ,
        newCanvas("BottomRight", "50vw", "50vh")
            .add("center at 50%", "middle at 50%", newImage(images[3])) // retrieve the fourth image from the shuffled array
            .print("center at 75%", "middle at 75%")
            .log() 
        ,
        newTimer(2200).start().wait() // 2200 ms preview time
        ,
        // start the eyetracker
        getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
            .add(   // We track the Canvas elements   
                getCanvas("TopLeft"),
                getCanvas("BottomLeft"),
                getCanvas("TopRight"),
                getCanvas("BottomRight") 
            )
            .log()
            .start()
        ,
        // play the audio
        newAudio("sentence", row.audio)
            .log()
            .play()
            .wait()
        ,
        // add 500 ms overspill time after the audio has finished playing
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop the eyetracker to prevent collecting unnecessary data
        ,
        // check whether the audio has indeed stopped playing
        getAudio("sentence").wait("first")
        ,
        // 200 ms overspill time 
        newTimer(200).start().wait()
        ,
        // relaunch fullscreen (which only has an effect if the participant closed the fullscreen for whatever reason)
        fullscreen()
        )
    // save the required trial info in the results file 
    .log("Subject"              , getVar("Subject")         )
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log( "toplefttimage"       , images[0]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomleftimage"     , images[1]                 ) // save which image is printed here (since the array was shuffled)
    .log( "toprightimage"       , images[2]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomrightimage"    , images[3]                 ) // save which image is printed here (since the array was shuffled)
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )     
    .log( "list"                , row.list                  )
    .log( "stimulusset"         , row.pair                  )
    .log( "ViewportWidth"       , window.innerWidth         ) // Screensize: width
    .log( "ViewportHeight"      , window.innerHeight        ) // Screensize: heigth     
)

// Now that the task is completed, we present two post-experimental questionnaires to the participants. These questionnaires are written in HTML.
newTrial("WebcamQuestionnairePage",
    //show cursor     
    newFunction( ()=>{
        $("body").css({
            width: '100vw',
            height: '100vh',
            cursor: 'default'
           });
        }).call()
    ,
    newHtml("LanguageQuestionnaire", "LanguageQuestionnaire.html")
        .settings.log()
        .cssContainer({"width":"720px"})
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .wait(getHtml("LanguageQuestionnaire").test.complete()
                  .failure(getHtml("LanguageQuestionnaire").warn())
        )
) 

// And questionnaire 2.
newTrial("WebcamQuestionnairePage",
    newHtml("downloadspeed", "speedtest.html")
        .settings.log()
        .print("center at 50%", "middle at 50%")
    ,
    newTimer(100)
        .start()
        .wait()
    ,
    getHtml("downloadspeed")
        .remove()
    ,
    newHtml("WebcamQuestionnaire", "WebcamQuestionnaire.html")
        .settings.log()
        .cssContainer({"width":"720px"})
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .wait(getHtml("WebcamQuestionnaire").test.complete()
                  .failure(getHtml("WebcamQuestionnaire").warn())
        )
) 

// Send the results to the server (!!!)
PennController.SendResults("Send");

// And we show a clozing page.
newTrial("FinalPage",
    newTimer(100)
        .start()
        .wait()
    ,
    getHtml("downloadspeed")
        .remove()
    ,
    exitFullscreen()
    ,
    newText("Final","This is the end of the experiment. <br> Thank you for your participation! If you have any questions or if you want to know more about the results, please get in touch with me via mieke.slim@ugent.be")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("Final"))
        .print("center at 50%", "middle at 50%") 
    ,     
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
