/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	if (id == 'deviceready') {
 			changePage('view');
 		}
        console.log('Received Event: ' + id);
    }
    
};

lastTimestamp = 0;
savedComments = [];

function initializeViewPage() {
	var thePage = $('.page#view');
	thePage.find('#submitLink').click(function() {
		var theASIN = thePage.find('#ASIN').val();
		var theTimestamp = thePage.find('#timestamp')
		
		getComments(theASIN, theTimestamp, 
			function(returnedComments) {
				console.log('returnedComments has length ' + returnedComments.length);
				for (var i = 0;i<returnedComments.length;i++) {
					var thisCommentIsNew = true;
					console.log('savedComments length is ' + savedComments.length.toString());
					for (var j = 0;j<savedComments.length;j++) {
						console.log('checking ' + returnedComments[i]["comment"] + ' against ' + savedComments[j]["comment"]);
						if (returnedComments[i]["comment"] == savedComments[j]["comment"]) {
							thisCommentIsNew = false;
						}
					}
					if (thisCommentIsNew) {
						savedComments.push(returnedComments[i]);
					}
				}
			}
		);
	});
	thePage.find('#triggerSubmit').click(function() {
		console.log('clicked the trigger submit button');
		var timestamp = getTimestamp();
		$('#commentTimestamp').val(timestamp);
		$('#submitDivHidden').fadeIn(200);
	});
	thePage.find('#sendSubmit').click(function() {
		console.log('sending comment');
		
		var ASIN = getASIN();
		$('#submittedCommentTimestamp').val(getTimestamp());
		var timestamp = $('#submittedCommentTimestamp').val();
		var username = getUsername();
		var commentText = $('#submittedComment').val();
		
		sendComment(ASIN, timestamp, username, commentText);
		
		$('#submitDivHidden').fadeOut(200);
		$('#submittedComment').val('');
	});
}

function sendComment(ASIN, timestamp, username, commentText) {
	var url = 'http://vps.stu.ie/comments/' + ASIN + '/' + timestamp;
	$.post(url, 
		{user_id:'1', comment:commentText, jsonpcallback:'abc123'}, 
		function(data) {
			console.log(data);
		}
	);
}

function getASIN() {
	var this_is_set_up = false;
	if (this_is_set_up) {
		//get the currently playing ASIN
	} else {
		return 1234;
	}
}

function getUsername() {
	var this_is_set_up = false;
	if (this_is_set_up) {
		//get the username of the user
	} else {
		return 'scubbo';
	}
}

$(document).ready(function() {
	window.myTimer = window.setInterval(heartbeat, 2000);
});

document.addEventListener('pause', function() {
	window.clearInterval(window.myTimer);
}, false);

document.addEventListener('resume', function() {
	window.myTimer = window.setInterval(heartbeat, 2000);
}, false);

function heartbeat() {
	console.log('heartbeat');
	var currentTimestamp = getTimestamp();
	if (currentTimestamp != lastTimestamp) {
		console.log('current != last');
		$.each($('#commentsDisplay').children(), function(index, elem) {
			console.log('checking child ' + $(elem).html() + ' with timestamp ' + $(elem).attr('data-timestamp') + ' against ' + currentTimestamp.toString());
			if (parseInt($(elem).attr('data-timestamp')) > currentTimestamp) {
				$(elem).hide();
			}
		});
		for (var i = 0;i<savedComments.length;i++) {
			console.log('checking');
			console.log(savedComments[i]["comment"]);
			if (parseInt(savedComments[i]["time"]) <= currentTimestamp && currentTimestamp - parseInt(savedComments[i]["time"]) <= 120) {
				var thisCommentIsNotDisplayed = true;
				$.each($('#commentsDisplay div[data-timestamp="' + savedComments[i]["time"] + '"]'), function(index,elem) {
					if ($(elem).find('.maintext').html() == savedComments[i]["comment"]) {
						thisCommentIsNotDisplayed = false;
					} 
				});
				if (thisCommentIsNotDisplayed) {
					var theNewDiv = $('<div/>');
					$(theNewDiv).attr('class', 'comment').attr('data-timestamp', savedComments[i]["time"]).html('<span class="maintext">' + savedComments[i]["comment"] + '</span><span class="username">' + savedComments[i]["user"] + '</span>').prependTo('#commentsDisplay').slideDown(200);
					console.log('adding comment');
				}
			}
		}
	}
	lastTimestamp = currentTimestamp;
}

function getTimestamp() {
	var this_is_set_up = false;
	if (this_is_set_up) {
		//get the timestamp from the TV
	} else {
		var timestamp = parseInt($('#heartbeatTimestamp').val());
		return timestamp;
	}
}

function changePage(theID) {
	if ($('.page#' + theID).length > 0) {
		$('.page').hide();
		$('.page#' + theID).show();
		switch (theID) {
			case 'view':
				initializeViewPage();
				break;
		} 
	}
}

function getComments(theASIN, theTimestamp, theCallback) {
	var theASIN = "1234";
	var theTimestamp = "10";
	$.ajax({
		url: 'http://vps.stu.ie/comments/' + theASIN + '/' + theTimestamp + '?jsonpcallback=?',
		data: {ASIN:theASIN, timestamp:theTimestamp},
		jsonpcallback: "jsonpcallback",
		success: function(data, textStatus, jqXHR) {
			theCallback(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},
		dataType: 'JSONP'
	});
}