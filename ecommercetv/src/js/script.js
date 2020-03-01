window.addEventListener('DOMContentLoaded', function() {


	// Handle scroll to top button
	
	window.addEventListener('scroll', function() {
	
		if(window.pageYOffset > 200) {
			if(document.querySelector('.scrolltotop_button') !== null) {
	 
				document.querySelector('.scrolltotop_button').style.display = 'block';
				setTimeout(function() {
				document.querySelector('.scrolltotop_button').style.opacity = '0.9';	
				},200);
			} 
		} else {
			if(document.querySelector('.scrolltotop_button') !== null) {
		 		document.querySelector('.scrolltotop_button').style.opacity = '0';	

		 		setTimeout(function() {
				document.querySelector('.scrolltotop_button').style.display = 'none';
				},200);
			} 
		}
	})
	
})