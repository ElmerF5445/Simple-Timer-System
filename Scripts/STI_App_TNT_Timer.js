/* DL_App_Javascript_PomodoroTimer.js
	This file contains all the functions needed for the page DL_PomodoroTimer.html
	Copyright Content By ElmerF 2022
*/

// Change the starting time for the timer
var starting_Minutes = 3;
var starting_Seconds = 0;



var timer_Minutes = 3;
var timer_Seconds = 59;
var display_timer_Minutes;
var display_timer_Seconds;
var pomodoro_Stage = 1;
var pomodoro_Status = "Work";
var timer_Status = 1;
function PT_ResetTimer(){
	timer_Minutes = starting_Minutes;
	timer_Seconds = starting_Seconds;
	pomodoro_Stage = 1;
	var pomodoro_Status = "Work";
	PT_UpdateTimer();
	
	var audioFile = document.getElementById("PT_Notification_Work");
		audioFile.play();
		audioFile.addEventListener("ended", function (){
			audioFile.currentTime = 0;
		});
	document.getElementById("PT_Controls_Container").style.gridTemplateColumns = "1fr 1fr";
	document.getElementById("pageElement_PT_Control_Pause").style.display = "block";
	document.getElementById("PT_MainContainer").style.borderColor = "green";
	document.getElementById("pageElement_PT_Stage_1").style.backgroundColor = "green";
	document.getElementById("pageElement_PT_Timer").style.color = "green";
	document.getElementById("pageElement_PT_Control_Start").style.display = "none";
	document.getElementById("pageElement_PT_Control_Skip").style.display = "block";
}



function PT_UpdateTimer(){	
	if (timer_Status = 1){
		timer_Seconds--;
	}
	if (timer_Seconds == -1 && timer_Minutes != 0){
		timer_Seconds = 59;
		timer_Minutes--;
	}
	
	display_timer_Minutes = timer_Minutes;
	if (timer_Minutes < 10){
		display_timer_Minutes = "0"+timer_Minutes;
	}
	display_timer_Seconds = timer_Seconds;
	if (timer_Seconds < 10 && timer_Seconds > 0){
		display_timer_Seconds = "0"+timer_Seconds;
	}
	if (timer_Seconds < -1){
		display_timer_Seconds = timer_Seconds;
	}
	
	if (timer_Minutes == 0 && timer_Seconds == 0){
		document.getElementById("PT_MainContainer").style.borderColor = "red";
		document.getElementById("pageElement_PT_Stage_1").style.backgroundColor = "red";
		document.getElementById("pageElement_PT_Timer").style.color = "red";
		document.getElementById("pageElement_PT_Timer").innerHTML = "Time's up!";
		/* timer_Status = 0; */
		var audioFile = document.getElementById("PT_Notification_Break");
		audioFile.play();
	}
	
	if (timer_Minutes == 0 && timer_Seconds == -30){
		timer_Status = 0;
		timer_isPaused = 1;
		document.getElementById("pageElement_Content").style.backgroundColor = "red";
	}
	
	if (timer_Minutes == 0 && timer_Seconds >= 30){
		document.getElementById("PT_MainContainer").style.borderColor = "green";
		document.getElementById("pageElement_PT_Stage_1").style.backgroundColor = "green";
		document.getElementById("pageElement_PT_Timer").style.color = "green";
	}
	
	if (timer_Minutes == 0 && timer_Seconds == 30){
		document.getElementById("PT_MainContainer").style.borderColor = "yellow";
		document.getElementById("pageElement_PT_Stage_1").style.backgroundColor = "yellow";
		document.getElementById("pageElement_PT_Timer").style.color = "yellow";
	}
	
	
	document.getElementById("pageElement_PT_Timer").innerHTML = timer_Minutes+":"+display_timer_Seconds;
	if (timer_Seconds <= -1){
		document.getElementById("pageElement_PT_Timer").innerHTML = display_timer_Seconds;
	}
	if (timer_Status == 1 && timer_isPaused == 0 || timer_isPaused == undefined){
		setTimeout(PT_UpdateTimer, 1000);
	}
}
document.getElementById("pageElement_PT_Control_Pause").innerHTML = "Pause";
var timer_isPaused = 0;
function PT_PauseUnpauseTimer(){
	if (timer_isPaused == 1){
		timer_isPaused = 0;
		var audioFile = document.getElementById("PT_Notification_Break_Long");
			audioFile.play();
			audioFile.addEventListener("ended", function (){
				audioFile.currentTime = 0;
			});
		document.getElementById("pageElement_PT_Timer").style.opacity = "100%";
		PT_UpdateTimer();
		document.getElementById("pageElement_PT_Control_Pause").innerHTML = "Pause";
	} else {
		timer_isPaused = 1;
		var audioFile = document.getElementById("PT_Notification_Break_Long");
			audioFile.play();
			audioFile.addEventListener("ended", function (){
				audioFile.currentTime = 0;
			});
		document.getElementById("pageElement_PT_Timer").style.opacity = "50%";
		document.getElementById("pageElement_PT_Control_Pause").innerHTML = "Unpause";
	}
}

function PT_Pause(){
	if (timer_Status == 1){
		timer_Status = 0;
		document.getElementById("pageElement_PT_Control_Pause").innerHTML = "Unpause";
	} else {
		timer_Status = 1;
		document.getElementById("pageElement_PT_Control_Pause").innerHTML = "Pause";
	}
}

function PT_UpdateStage(){
	location.reload();
	/* if (pomodoro_Status == "Work"){
		if (pomodoro_Stage == 4){
			pomodoro_Status = "Break";
			timer_Minutes = 20;
			timer_Seconds = 60;
			document.getElementById("pageElement_PT_Status").innerHTML = "Long Break";
			
			var audioFile = document.getElementById("PT_Notification_Break_Long");
			audioFile.play();
			audioFile.addEventListener("ended", function (){
				audioFile.currentTime = 0;
			});
			
			document.getElementById("pageElement_PT_Stage_1").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
			document.getElementById("pageElement_PT_Stage_2").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
			document.getElementById("pageElement_PT_Stage_3").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
			document.getElementById("pageElement_PT_Stage_4").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
		} else {
			pomodoro_Status = "Break";
			timer_Minutes = 4;
			timer_Seconds = 60;
			document.getElementById("pageElement_PT_Status").innerHTML = "Break";
			
			var audioFile = document.getElementById("PT_Notification_Break");
			audioFile.play();
			audioFile.addEventListener("ended", function (){
				audioFile.currentTime = 0;
			});
		}
	} else if (pomodoro_Status == "Break") {
		pomodoro_Status = "Work";
		timer_Minutes = 24;
		timer_Seconds = 60;
		pomodoro_Stage++;
		document.getElementById("pageElement_PT_Status").innerHTML = "Work";
		
		var audioFile = document.getElementById("PT_Notification_Work");
		audioFile.play();
		audioFile.addEventListener("ended", function (){
			audioFile.currentTime = 0;
		});
	}
	if (pomodoro_Stage == 5){
		pomodoro_Stage = 1;
		document.getElementById("pageElement_PT_Stage_1").style.backgroundColor = "var(--Accent-Color)";
		document.getElementById("pageElement_PT_Stage_2").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
		document.getElementById("pageElement_PT_Stage_3").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
		document.getElementById("pageElement_PT_Stage_4").style.backgroundColor = "var(--BGColor-ShortcutButtons)";
	}
	
	document.getElementById("pageElement_PT_Stage_"+pomodoro_Stage).style.backgroundColor = "var(--Accent-Color)"; */
}

