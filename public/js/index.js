
	var ref = new Firebase("https://bootup.firebaseio.com");


	$(document).ready(function() {

	var fireBaseSession = localStorage.getItem('firebase:session::bootup');
	var user;

	if (fireBaseSession) {
		user = JSON.parse(fireBaseSession);

	}

	if (user && user.github) {
		debugger;
		//addd username to header
		$('#userinfo').append(user.github.username);
		$('#userinfo').append('<img class="github-logo" src="' + user.github.profileImageURL + '"/>');
		//show logout button
		$('#logout').show();
	} else {
		if (window.location.pathname != '/login') {
			window.location = '/login';	
		}
		
	}
	

	$('#logout').click(function() {
		ref.unauth();
		window.location = "/login";
	});

	$('#login').click(function() {
		ref.authWithOAuthPopup("github", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    window.location = "/";
		  }
		});
	});


	$('.fa-heart').click(function() {		
		//$(this).attr("disabled","disabled").addClass('disabled');
		var score = $(this).siblings('.score');
		var scoreNumber = parseInt(score.text());
		var postId = score.data('post');
		$.post('/posts/' + postId + '/upvote').done(function(data) {
			score.text(++scoreNumber);
		});

	    // Init
	    var rand = Math.floor((Math.random()*100)+1);
	    var flows = ["flowOne", "flowTwo", "flowThree"];
	    var colors = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
	    var timing = (Math.random()*(1.3-1.0)+1.0).toFixed(1);
	    // Animate Particle
	    $('<div class="particle part-'+rand+' '+colors[Math.floor((Math.random()*6))]+'" style="font-size:'+Math.floor(Math.random()*(30-22)+22)+'px;"><i class="fa fa-heart-o"></i><i class="fa fa-heart"></i></div>').appendTo('.particle-box').css({animation: ""+flows[Math.floor((Math.random()*3))]+" "+timing+"s linear"});
	    $('.part-'+rand).show();
	    // Remove Particle
	    setTimeout(function(){
	        $('.part-'+rand).remove();
	    }, timing*1000-100);


	});





	$('.fa-thumbs-down').click(function() {
		//$(this).attr("disabled","disabled").addClass('disabled');
		var score = $(this).siblings('.score');
		var scoreNumber = parseInt(score.text());
		var postId = score.data('post');
		$.post('/posts/' + postId + '/downvote').done(function(data) {
			score.text(--scoreNumber);
		});
	});

});