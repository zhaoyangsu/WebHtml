/*
	A simple class for displaying file information and progress
	Note: This is a demonstration only and not part of SWFUpload.
	Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
*/

// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements
function FileProgress(file, targetID, swfUploadInstance) {
	this.fileProgressID = file.id;

	this.opacity = 100;
	this.height = 0;

	//this.fileTr = document.getElementById(this.fileProgressID);
	this.fileTr = document.getElementById("dfile" + this.fileProgressID);
	if (!this.fileTr) {
		
		this.fileTr = document.createElement("tr");		
		this.fileTr.filename = file.name;
		this.fileTr.id = "dfile" + this.fileProgressID;
				
		this.fileTd1 = document.createElement("td");
		this.fileTd1.className = "fileName";
		//this.fileTd1.appendChild(document.createTextNode(file.name));
	
		this.fileDiv = document.createElement("div");
		this.fileDiv.className = "progressContainer";
		this.fileTd1.appendChild(this.fileDiv);
		
		// create file link
		var fileLink = document.createElement("a");
		fileLink.href = "#";
		
		// file icon
		var fileImg = document.createElement("img");
		fileImg.className = "fileIcon";
		fileImg.alt = "*";
		fileImg.src = "/FileIcon.png";
		
		// file name
		this.fileDiv.appendChild(fileLink);
		fileLink.appendChild(fileImg);
		fileLink.appendChild(document.createTextNode(file.name));
				
		// cancel button
		var progressCancel = document.createElement("img");
		progressCancel.className = "progressCancel";
		// progressCancel.href = "#";
		// progressCancel.style.visibility = "hidden";
		// progressCancel.appendChild(document.createTextNode(" "));
		progressCancel.src = "/cancelbutton.png";
		
		var fileID = this.fileProgressID;
		progressCancel.onclick = function () {
			swfUploadInstance.cancelUpload(fileID);
			return false;
		};
		
		// progress bar
		this.progressBar = document.createElement("div");
		this.progressBar.className = "progressBarInProgress";
				
		this.fileDiv.appendChild(this.progressBar);
		
		this.fileTd2 = document.createElement("td");
		this.fileTd2.className = "fileLastMod";
		
		this.progressStatusEl = document.createElement("div");
		//this.progressStatusEl.className = "progressBarStatus";
		this.progressStatusEl.innerHTML = "&nbsp;";
		
		this.fileTd2.appendChild(progressCancel);
		this.fileTd2.appendChild(this.progressStatusEl);
		
		
		this.fileTd3 = document.createElement("td");
		this.fileTd3.className = "fileSize";

		this.fileTr.appendChild(this.fileTd1);
		this.fileTr.appendChild(this.fileTd2);
		this.fileTr.appendChild(this.fileTd3);
				
		//document.getElementById("fileList").appendChild(this.fileTr);
		
		$("#fileList").append(this.fileTr);
	
	}

	this.fileProgressElement = this.fileTr.childNodes[0].childNodes[0];
	this.progressCancel = this.fileTr.childNodes[1].childNodes[0];
	this.progressStatusEl = this.fileTr.childNodes[1].childNodes[1];
	this.progressBar = this.fileTr.childNodes[0].childNodes[0].childNodes[1];
	

	//this.height = this.fileTr.offsetHeight;

	// alert("all good");
}

FileProgress.prototype.setProgress = function (percentage) {
	//this.fileProgressElement.className = "progressContainer green";
	
	this.progressBar.className = "progressBarInProgress";
	this.progressBar.style.width = percentage + "%";
};

FileProgress.prototype.setComplete = function () {
	//this.fileProgressElement.className = "progressContainer blue";
	
	this.progressBar.className = "progressBarComplete";
	this.progressBar.style.width = "";

	var oSelf = this;
	setTimeout(function () {
		oSelf.disappear();
	}, 100);
};

FileProgress.prototype.setError = function () {
	//this.fileProgressElement.className = "progressContainer red";
	
	this.progressBar.className = "progressBarError";
	this.progressBar.style.width = "";

	var oSelf = this;
	setTimeout(function () {
		oSelf.disappear();
	}, 1000);
	
};

FileProgress.prototype.setCancelled = function () {
	//this.fileProgressElement.className = "progressContainer";
	
	this.progressBar.className = "progressBarError";
	this.progressBar.style.width = "";

	var oSelf = this;
	setTimeout(function () {
		oSelf.disappear();
	}, 100);
	
};

FileProgress.prototype.setStatus = function (status) {
	this.progressStatusEl.innerHTML = status;
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
	
	/*this.progressCancel.style.visibility = show ? "visible" : "hidden";
	if (swfUploadInstance) {
		var fileID = this.fileProgressID;
		this.progressCancel.onclick = function () {
			swfUploadInstance.cancelUpload(fileID);
			return false;
		};
	}*/
};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {

	//this.progressBar.style.display = "none";
		
	$(this.progressBar).fadeOut(3000, function () 
								{
									$(this.progressBar).remove();
								});
	
	
	$(this.progressCancel).fadeOut(500, function () 
								{
								$(this.progressCancel).remove();
								});
	
	/* var reduceOpacityBy = 15;
	var reduceHeightBy = 4;
	var rate = 30;	// 15 fps

	if (this.opacity > 0) {
		this.opacity -= reduceOpacityBy;
		if (this.opacity < 0) {
			this.opacity = 0;
		}

		if (this.progressBar.filters) {
			try {
				this.progressBar.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.progressBar.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		} else {
			this.progressBar.style.opacity = this.opacity / 100;
		}
	}

	if (this.height > 0) {
		this.height -= reduceHeightBy;
		if (this.height < 0) {
			this.height = 0;
		}

		this.progressBar.style.height = this.height + "px";
	}

	if (this.height > 0 || this.opacity > 0) {
		var oSelf = this;
		setTimeout(function () {
			oSelf.disappear();
		}, rate);
	} else {
		this.progressBar.style.display = "none";
	}
*/
};