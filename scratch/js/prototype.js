  	document.addEventListener("DOMContentLoaded", function() {

  		var droppedCodeBlocks = new Array();

  		var codeBlocks = document.querySelectorAll(".codeBlock");
  		var editingPanel = document.querySelector("#editingPanel");

  		var clearButton = document.querySelector("#clearButton");
  		var gettingStartedButton = document.querySelector("#gettingStartedButton");

  		var introductionTutorial;

  		codeBlocks.forEach(function(codeBlock) {
  			codeBlock.addEventListener("dragstart", function(evt) {
  				codeBlock.style.border = "solid blue 3px";
  				evt.dataTransfer.setData("Text", evt.target.id);
  			});
  			codeBlock.addEventListener("dragend", function() {
  				codeBlock.style.border = "none";
  			});
  		});

  		editingPanel.addEventListener("dragenter", function() {
  			editingPanel.style.border = "solid red 2px";
  		});

  		editingPanel.addEventListener("dragleave", function() {
  			editingPanel.style.border = "none";
  		});

  		editingPanel.addEventListener("dragover", function(evt) {
  			evt.stopPropagation();
            evt.preventDefault();
  		});

  		editingPanel.addEventListener("drop", function(evt) {
  			evt.stopPropagation();
  			evt.preventDefault();

  			if (document.querySelector("#undoButton")) {
  				document.querySelector("aside").removeChild(undoButton);
  				droppedCodeBlocks = [];
  			}

  			var data = evt.dataTransfer.getData("Text");
  			evt.target.appendChild(document.getElementById(data));
  			droppedCodeBlocks.push(document.getElementById(data));
  			editingPanel.style.border = "none";
  		});

  		// jQuery button selector
  		$("#gettingStartedButton").click(function() {
  			if (!document.querySelector("#introductionTutorial")) {

	  			introductionTutorial = document.createElement("article");
	  			var closeIntroButton = document.createElement("button");
	  			var closeIcon = document.createElement("span");

	  			introductionTutorial.id = "introductionTutorial";
	  			introductionTutorial.innerHTML = "Scratch Introduction...";

	  			closeIntroButton.className = "close";
	  			closeIntroButton.setAttribute("aria-label", "Close Button"); // include text for screen readers

	  			closeIcon.innerHTML = "&times;";
          closeIcon.setAttribute("aria-label", "Close Icon");
	  			closeIcon.setAttribute("aria-hidden", "true");

	  			closeIntroButton.appendChild(closeIcon);
	  			introductionTutorial.appendChild(closeIntroButton);
	  			editingPanel.appendChild(introductionTutorial);

	  			// prevent potential errors: when the user drags the code block into the tutorial panel, this is not allowed.
	  			introductionTutorial.addEventListener("drop", function(evt) {
	  				evt.stopPropagation();
	  				evt.preventDefault();
	  			});

	  			closeIntroButton.onclick = function() {
	  				editingPanel.removeChild(introductionTutorial);
	  			}
  			}	
  		});

  		clearButton.onclick = function() {
  			if (droppedCodeBlocks.length == 0) {
  				alert("You haven't coded yet");
  			} else {
	  			var con = confirm("Are you sure to delete the Sprite? \n(The associated code blocks will also be deleted.)");
	  			if (con) {
	  				var undoButton = document.createElement("button");
	  				undoButton.innerHTML = "Undo";
	  				undoButton.id = "undoButton";
	  				undoButton.className = "btn btn-outline-secondary";
	  				document.querySelector("aside").appendChild(undoButton);   

			  		document.querySelector("#undoButton").onclick = function() {
			  			droppedCodeBlocks.forEach(function(droppedCodeBlock) {
			  				editingPanel.appendChild(droppedCodeBlock);
			  			});
			  			document.querySelector("aside").removeChild(undoButton);
			  		}  		
			  		droppedCodeBlocks.forEach(function(droppedCodeBlock) {
	  					editingPanel.removeChild(droppedCodeBlock);
	  				});		
	  			} 
  			}
  		}

  	});