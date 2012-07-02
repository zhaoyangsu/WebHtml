/* Tom Biel, Imagam, Inc.
 created for iFiles
*/
var swfu;

function initSwfUpload(uploadUrl, upToken)
{
	var settings = 
	{
	flash_url : "swfupload.swf",
	upload_url: "/upload.tfs?filePath="+uploadUrl,	// Relative to the SWF file
	post_params: {"UTK" : upToken},
				//file_size_limit : "100 MB",
	file_types : "*.*",
	file_types_description : "All Files",
	file_upload_limit : 5000,
	file_queue_limit : 0,
				
	custom_settings : {
		progressTarget : "fsUploadProgress",
		cancelButtonId : "btnCancelMultiUpload"
	},
				
	debug: false,
				
	// Button Settings
	button_image_url : "uploadButton.png",
	button_placeholder_id : "multiUploadSWFPlaceholder",
	button_width: 120,
	button_height: 40,
	button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,


	swfupload_element_id : "flashUploadUI",		// Setting from graceful degradation plugin
	degraded_element_id : "degradedUploadUI",	// Setting from graceful degradation plugin
				

	// The event handler functions are defined in handlers.js
	swfupload_loaded_handler : swfUploadLoaded,

	file_queued_handler : fileQueued,
	file_queue_error_handler : fileQueueError,
	file_dialog_complete_handler : fileDialogComplete,
	upload_start_handler : uploadStart,
	upload_progress_handler : uploadProgress,
	upload_error_handler : uploadError,
	upload_success_handler : uploadSuccess,
	upload_complete_handler : uploadComplete,
	queue_complete_handler : queueComplete, 
				
	minimum_flash_version : "9.0.28",
	swfupload_pre_load_handler : swfUploadPreLoad,
	swfupload_load_failed_handler : swfUploadLoadFailed
	};

	swfu = new SWFUpload(settings);
} 

function deleteFile(fileEl)
{
	if(confirm("Are you sure you want to delete this file?\r\n\r\n" + $(fileEl).attr("filename")))
	{
		$.ajax({
			type: "GET",
			url: "/(-bin-)/action.tfs",
			fileEl: fileEl,
			data: "action=delete&filename=" + $(fileEl).attr("url") + $(fileEl).attr("filename"),
   					
			success: function(msg) {
				$(this.fileEl).remove();
				$("#testEl").append(msg);
			},
   					
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert( "Failed deleting files: " + $(this.fileEl).attr("filename"));
			}
		});
 
		$(fileEl).remove();
	}
}

function downloadFile(filename)
{  
	window.location.replace("/(-bin-)/downLoad.tfs"+filename + '?filePath='+filename);
    //window.open("/(-bin-)/downLoad.tfs"+filename + '?filePath='+filename);
    //var url = window.location +"/(-bin-)/downLoad.tfs"+filename + '?filePath='+filename ;
    
    //return confirm(url);
} 
	     
function createFolder()
{
	$.ajax({
		   type: "GET",

			url: "/(-mod-)/createfolder.mod",
			data: "name=" + $("#createFolderText").val() + "&path=" + currentUrlPath,
   					
			success: function(msg) {
				var results = JSON.parse(msg);
   						
				if(results.status == "ok")
				{
					inserFolderToTable($("#createFolderText").val());
   							
					$("#createFolderMsg").html(results.message);
					$("#createFolderMsg").removeClass("errorText");
				}
				else
				{
					$("#createFolderMsg").html(results.message);
					$("#createFolderMsg").addClass("errorText");
				}
			},
   					
		   error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#createFolderMsg").html("There was an error creating folder");
		   }
		});

	//$("#createFolderMsg").load("/(-mod-)/createfolder.mod?name=" + "test");
}
	
	     
function inserFolderToTable(folderName) 
{
	var fileTr = document.createElement("tr");		
	fileTr.filename = folderName;
	fileTr.id = "dfile" + folderName;
				
	fileTd1 = document.createElement("td");
	fileTd1.className = "fileName";
	//this.fileTd1.appendChild(document.createTextNode(file.name));
	
	var fileDiv = document.createElement("div");
	fileTd1.appendChild(fileDiv);
			
	// create file link
	var fileLink = document.createElement("a");
	fileLink.href = "javaScript:initTable(\""+currentUrlPath + folderName+"/\");";
		
	// file icon
	var fileImg = document.createElement("img");
	fileImg.className = "fileIcon";
	fileImg.alt = "*";
	fileImg.src = "FolderIcon.png";
		
	// file name
	fileDiv.appendChild(fileLink);
	fileLink.appendChild(fileImg);
	fileLink.appendChild(document.createTextNode(folderName));
				
		
	var fileTd2 = document.createElement("td");
	fileTd2.className = "fileLastMod";
		
	//this.progressStatusEl = document.createElement("div");
	//this.progressStatusEl.className = "progressBarStatus";
	//this.progressStatusEl.innerHTML = "&nbsp;";
	//fileTd2.appendChild(progressCancel);
	//fileTd2.appendChild(this.progressStatusEl);
		
	var fileTd3 = document.createElement("td");
	fileTd3.className = "fileSize";

	fileTr.appendChild(fileTd1);
	fileTr.appendChild(fileTd2);
	fileTr.appendChild(fileTd3);
				
	//document.getElementById("fileList").appendChild(this.fileTr);
		
	$("#fileList").append(fileTr);
}

