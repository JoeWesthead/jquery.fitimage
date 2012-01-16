/*
 * jQuery fitImage
 *
 * Copyright (c) 2011 Joe Westhead (http://twitter.com/joewesthead)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.2
 
 * This plugin is useful for occasions when you are pulling images from an external source
 * and you are unsure what their dimensions are, but still need to fit the image within a
 * container of specific dimensions.
 *
 * e.g. your <div><img src="http://graph.facebook.com/xxxxxx"></div>
 * 
 * The plugin performs the following:
 * 		1. 	Detects hidden images & temporarily shows them (off screen)
 * 		2.	Compares ratios of dimensions to work out whether height or width should be scaled first
 * 		3. 	Re-hide hidden images
 *		4.	Apply vertical or horizontal offsets to center the image
 *
 *
 * Example usage:
 * $('.thumbnail img').fitImage();
 *
 * IMPORTANT: Make sure the container has overflow : hidden in its CSS,
 * or else the image will be visible beyond the confines of the container.
 *
 * Credit to Davide Petrillo for his evenIfHidden plugin, which helps get the dimensions of hidden elements
 * Source: http://petr.illodavi.de/jquery.evenIfHidden/jquery.evenifhidden.js
 *
 *
 */
;(function($){
	 
	//Attach this new method to jQuery
	$.fn.extend({ 
	     
	    //This is where you write your plugin's name
	    fitImage: function() {
	
	        //Iterate over the current set of matched elements
	        return this.each(function(index) {

	    		var $this = $(this);
	    			        		
	    		$this.load(function() {
	    		    				
    				// Temporarily show hidden images to get dimensions
    				var hiddenElements = $(this).parents().andSelf().filter(':hidden'), 
    					styleBackups = [];
    				hiddenElements.each( function() {
						var style = $(this).attr('style');
						style = typeof style == 'undefined'? '': style;
						styleBackups.push(style);
						$(this).attr('style',style+' display: block !important;');
					});
					hiddenElements.eq(0).css('left', -9999);
		
	    			var	$parentHeight = $this.parent().height(),
	    				$parentWidth = $this.parent().width(),
	    				$origHeight = $(this).height(),
	    				$origWidth = $(this).width(),
	    				$ratioWidth = $origWidth / $parentWidth,
	    				$ratioHeight = $origHeight / $parentHeight;
	    			
	    			// We first resize whichever dimension has the furhest to go
	    			if ($ratioWidth >= $ratioHeight) {
	    			    $newHeight = $parentHeight;
	    			    $newWidth = $origWidth/($origHeight/$parentHeight);
	    			}
	    			else {
	    			    $newWidth = $parentWidth;
	    			    $newHeight = $origHeight/($origWidth/$parentWidth);
	    			}
	    				    			
	    			// Restore the original styles					
					hiddenElements.eq(0).css('left', 0);
					hiddenElements.each( function() {
    				 	$(this).attr('style',styleBackups.shift());
    				});
    				
    				// Set our desired dimensions
    				// Important to do this AFTER the original styles have been restored
	    			$(this).height($newHeight).width($newWidth);

	    			// Find the offset to be able to center the image
	    			var $vOffset = Math.round(($newHeight - $parentHeight) / 2);
	    			var	$hOffset = Math.round(($newWidth - $parentWidth) / 2);

	    			// Apply the necessary offsets
	    			if ($vOffset > 0) {
	    				$this.css({'position':'relative','top':'-'+$vOffset+'px','vertical-align':'bottom'});
	    			}
	    			if ($hOffset > 0) {
	    				$this.css({'position':'relative','left':'-'+$hOffset+'px'});
	    			}
	    			
	            });			
	     	                
	        });
	    }
	});
	
})(jQuery);
