PennController.ResetPrefix(null) // Shorten command names (keep this)
PennController.DebugOff() // Don't show the debug window

// Resources are hosted on a distant server
AddHost("https://users.ugent.be/~mslim/VW_Stimuli_onserver/"); // I actually recommend hosting them as ZIP files instead, see: https://doc.pcibex.net/how-to-guides/managing-resources/

// PHP script that receives, stores (and will also output) the eye-tracking data
EyeTrackerURL("DUMMY"); // Please see PCIbex' how-to guide on how to set up a server: https://doc.pcibex.net/how-to-guides/collecting-eyetracking-data/

// Check preload of required files:
CheckPreloaded("CheckPreload")

// Below is a fake loading page. I added this because the first page was often a bit glitchy, and this way, there is more loading time.
newTrial("Loading",
    newText("Loading", "Loading...")
        .center()
        .print()
    ,
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
    newText("PermissionWebcam", "Two brief questions before we begin:<br><br>We need to use your webcam to record where you are looking on the screen. We will <b>not</b> record any video or collect any other type of data that may reveal your identity. Do you give us permission to use your webcam?")
    ,
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
    newKey("yesno", "FJ")
        .wait()
    ,
    getKey("yesno")
        .test.pressed("F")
        .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoPermision", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately you cannot participate in this study. Please close the experiment by closing the browser (you can ignore possible pop-up screens)"))
                .print("center at 50%", "top at 25%") 
            ,
            newButton("waitforever")
                .wait()
        )
)

newTrial("ChromeCheck",
    newText("ChromeCheckText", "Two brief questions before we begin:<br><br>This study only works well if you are using the Google Chrome browser on a laptop or desktop computer (so not on a mobile phone or tablet). Are you currently using <b> Google Chrome Desktop </b>?")
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


// This is a brief download speed test. As you will see below in the script, this test is repeated throughout the experiment. 
newTrial("downloadspeed",
    newHtml("downloadspeed", "speedtest.html")
        .settings.log()
        .print("center at 50%", "middle at 50%")
    ,
    newTimer(100)
        .start()
        .wait()
    ,
    newVar("Subject", randomnumber = Math.floor(Math.random()*1000000))
        .global()
        .log()
) 


// Welcome text
newTrial("Welcome",
    newText("WelcomeText", "Welcome and thank you for participating in this experiment.<br><br>Cognitive scientists often record eye movements to study human behavior, because eye movements tell a lot about how we divide our attention and how we make decisions. Typically, expensive eye-tracking devices are used to record eye movements. The aim of this experiment is to test whether we could also use webcams to achieve this goal. <br><br>The task is very simple and should take roughly 5 minutes to complete. In this task, you will see a picture displayed in one corner of your computer screen while you hear a sentence that may or may not relate to this picture. All you have to do is fixate on this picture. Your webcam will be used to follow your eye movements on the task. <br><br> We will <b>not</b> collect any video data or any other type of data that may reveal your identity. We only collect data on where on the screen your eyes are looking during the experiment.<br><br> Unfortunately, the experiment may not work for everyone: Sometimes the webcam is not able to pick up your eye movements (for a variety of possible reasons). We will test in a moment whether the experiment works for you. In case it doesn’t, you will be returned to Prolific and receive £0.50 to compensate for your effort and time. In case you can complete the whole task, you will receive £1. <br><br> It is important that you are in a well-lit and quiet environment, otherwise the webcam may not be able to pick up your eye movements. Please turn off any devices or applications that may distract you during this task (such as your mobile phone or your email application) and please close other websites that you may have open.<br><br>If you have any questions about this experiment, feel free to get in touch with me (Mieke Slim) via email: mieke.slim@ugent.be <br><br> Press <b>SPACE</b> to continue. <br><br>The next pages will appear in fullscreen. <b>Please do not close the fullscreen for the remainder of this experiment. </b>")
    ,
    newCanvas("InstructionsCanvas", "60vw" , "20vh")
        .add(0,0, getText("WelcomeText"))
        .print("center at 50%", "top at 25%") 
    ,
    newKey("next", " ")
        .wait()
)
.setOption("hideProgressBar", true) 


//Consent text:
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
.setOption("hideProgressBar", true) 


//Ask for the Prolific ID
PennController("ProlificID_trial",   
    newText("Please fill in your Prolific ID below, so we can process your payment")
        .center()
        .print()
    ,
    newTextInput("ProlificID")
        .center()
        .print()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
    ,
    newVar("ProlificID")
        .settings.global()
        .set( getTextInput("ProlificID") )
    )
    .log( "ProlificID" , getVar("ProlificID") )

// Page that helps with the webcam set-up
PennController("WebcamSetUp",
    newText("WebcamSetUpText", "The next pages will help you set up the audio and webcam. The webcam will be set up in a simple calibration procedure. During this calibration, you will see a video of your webcam stream. Again, we will not save any recordings of this video stream. Please make sure your face is fully visible, and that you sit centrally in front of your webcam by following the instructions in the picture below.<br><br>You can start the calibration procedure by clicking on the start button that will appear on the middle of the screen.<br><br>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and <b>look at it for three seconds</b> so the algorithm can check whether it's well calibrated.<br><br>In case calibration fails, the last step will be repeated. <br><br><b>If calibration fails three times in a row</b>, you won't be able to complete the experiment. In this case, you'll be redirected to Prolific and receive £0.50 for your time and effort. If calibration succeeds, you will continue to the full experiment (and receive £1 for your participation).<br><br> Press <b>SPACE</b> to continue to the next trial")
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
        .wait( newEyeTracker("tracker").test.ready() )
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
    getEyeTracker("tracker")
        .calibrate()
        .test.score(50)
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
                    .test.score(50)
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
                                .test.score(50)
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
        .noHeader()
        .setOption("hideProgressBar", true)
        
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
            newText("FailedCalibration","Unfortunately, the calibration failed again. It seems that the webcam is not able to pick up your eye movements. You will receive £0.50 for your time and effort. Please verify your participation on Prolific by clicking on this link: <p><a href='https://app.prolific.co/submissions/complete?cc=4E2A5428'>https://app.prolific.co/submissions/complete?cc=4E2A5428</a> (please ignore the pop-up window that may appear, you can click on 'leave'). </p> </strong> <br> Thank you for your participation! If you have any questions or if you want to know more about the results, please get in touch with me via mieke.slim@ugent.be")
                .print("Center at 50%", "Middle at 50%")
            ,     
            newButton("waitforever").wait()
            )
    
    )
    .setOption("hideProgressBar", true)
    
// Audio set-up
PennController("AudioSetUp",
    newText("AudioInstructions", "Now that you have set up and calibrated the webcam, let’s set up the audio. In this experiment, you will hear a number of sentences. You can play one of the sentences that will be used in the experiment by clicking the play button below. Please use this audio recording to adjust your volume. Feel free to replay this sentence as often as you need. Once you’re ready, you can go to the next page.")
    ,
    newAudio("Volume_sentence", "practice_engels_Sarah_Mary_hits_a_boy_2_ok.wav")
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
    .setOption("hideProgressBar", true) 
    
// Audio check
newTrial("AudioCheck",
    newText("AudioCheckUp", "Now that the audio volume is set, please listen to the audio file presented below. After you listened to the sentence, please type in the sentence you heard in the field that appears.<br><br>Please listen carefully, because <b>you can only listen to the sentence once.</b><br><br> Feel free to move your head if you want to look at your keyboard while typing. ")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioCheckUp"))
        .print("center at 50%", "top at 25%")
    ,    
    newAudio("Check_sentence", "practice_engels_Sarah_Mary_has_a_diamond_ok.wav")
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
        .remove()
    ,
    newTextInput("AudioCheckInput", "Type in the sentence you heard")
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
    .setOption("hideProgressBar", true) 

// Experiment instructions:
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
    newText("TaskInstructions", "<p>You're all set to start the experiment! You will hear four short sentences while a picture is displayed in one of the four corners on the screen. Please look at this picture for the whole duration of the sentence.<br><br>Before each trial starts, you will see a button in the middle of your screen. Click on this button and look at it for three seconds. The webcam will check whether it is still calibrated. If it is, the trial will automatically start after three seconds. Otherwise, the calibration procedure will be repeated. <br><br>During the trials, you don't need to click on anything: Just listen and watch! <br><br>We’ll first start with two practice trials, so you will know how the experiment works. Then, we will continue to the experiment. This experiment should take roughly 2 minutes to complete<br><br>Please make sure you keep your head as still as possible throughout the experiment")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add(0,0, getText("TaskInstructions"))
        .print("center at 50%", "top at 25%")   
    ,
    newButton("Take me to the trials")
        .center()
        .print("center at 50%", "top at 70%")
        .wait()
)
    .setOption("hideProgressBar", true) 

//Trials
Template("TryA.csv", row =>
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
        // The callback commands lets us log the X and Y coordinates of the estimated gaze-locations at each recorded moment in time (Thanks to Jeremy Zehr for helping us construct this command)
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
        //show cursor     
        newFunction( ()=>{
            $("body").css({
                width: '100vw',
                height: '100vh',
                cursor: 'default'
           });
        }).call()
        ,
        getEyeTracker("tracker")
            .calibrate(50)  // Make sure that the tracker is still calibrated
            .log()  // log the calibration scores
        ,
        defaultImage.size("20vh", "20vh")
        ,
        images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random())
        ,
        newCanvas("image1", "50vw", "50vh")
          .add("center at 50%", "middle at 50%", newImage(images[0]))
          .print("center at 25%", "middle at 25%")
        ,
        newCanvas("image2", "50vw", "50vh")
          .print("center at 25%", "middle at 75%")
        ,
        newCanvas("image3", "50vw", "50vh")
          .print("center at 75%", "middle at 25%")
        ,
        newCanvas("image4", "50vw", "50vh")
          .print("center at 75%", "middle at 75%")
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
        newTimer(2200).start().wait()
        ,
        getEyeTracker("tracker")
        // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
        .add( getCanvas("image1") , getCanvas("image2") , getCanvas("image3") , getCanvas("image4") )
        .start()
        .log() 
        ,
        newAudio("test", row.audio)
            .log()
            .play()
            .wait()
        ,
        newTimer(500).start().wait()
        ,     
        getEyeTracker("tracker").stop() // Stop now to prevent collecting unnecessary data
        ,
        newTimer(200).start().wait()
        ,
        fullscreen()
        )
    .setOption("hideProgressBar", true)
    .noHeader()     
    .log("Subject"              , getVar("Subject")         )
    .log( "ProlificID" , getVar("ProlificID") )
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log("toplefttimage"        , images[0]                 )
    .log("bottomleftimage"      , images[1]                 )
    .log("toprightimage"        , images[2]                 )
    .log("bottomrightimage"     , images[3]                 )
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )       
)


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

PennController.SendResults("Send");

newTrial("FinalPage",
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
    exitFullscreen()
    ,
    newText("Final","This is the end of the experiment. Since you've completed the full experiment, you will receive an extra £0.50 (so you'll receive £1 in total) <strong> Please verify your participation on Prolific by clicking on this link: <p><a href='https://app.prolific.co/submissions/complete?cc=4E2A5428'>https://app.prolific.co/submissions/complete?cc=4E2A5428</a></p> </strong> <br> Thank you for your participation! If you have any questions or if you want to know more about the results, please get in touch with me via mieke.slim@ugent.be")
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("Final"))
        .print("center at 50%", "middle at 50%") 
    ,     
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
    .setOption("hideProgressBar", true)
