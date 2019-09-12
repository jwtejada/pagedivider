(function($){ 
	$.fn.extend({          
		tntdivider: function(options) { 
			var defaults = {
				title: 'h2',        
				alignTitles: false,
				alignBody: false,
				alignHeight: 275,
				alt:'null',
				mobileWidth: 900,
				callback: function() {}
			}        
			options = $.extend(defaults, options);    
			
			var container = $(this);			
			var obj = container.children(options.title).addClass("pd-title");
			var objHeight = options.alignHeight;     
			
			$.when( setupBlocks(options) ).done(function(){
				//call scroll to anchor function
				if (window.location.hash){ scrollToAnchor(window.location.hash); }
			}); 		
			
			function setupBlocks(options) {
				var o = options;	
				var wrapTitle = false;
				//MAIN WRAP
				$(".pd-title").each(function() {
					$(this)
						.nextUntil('.pd-title')
						.addBack()
						.wrapAll('<div class="pd-block"><div class="pd-body">');        
				});				
				//var iniBodyH = $(".p")
				//move anchors IMPORTANT
				container.find("a[name]:first-of-type").each(function(){  
					var getAnchor = $(this).parent().addClass('pd-anchor'),
						 anchorTarget = $(this)
					.parentsUntil(this)
					.next()
					.find(".pd-title").parent();
					getAnchor.prependTo(anchorTarget);
				});
				
				//set alternate
				if(container.data("alt") != null) { 
					altBlocks(container.data("alt"));
				}else if(o.alt != null) {
					altBlocks(o.alt) 
				}						
				//check for images
				blockHasImg();								
				//align titles
				if(o.alignTitles == true) { 
					moveTitles(); 
				}
				if(o.alignBody == true && o.alignTitles == true ) { 					
					wrapTitle = true;
					alignContent(wrapTitle); 
				} else if(o.alignBody == true && o.alignTitles == false) { 					
					wrapTitle = false;
					alignContent(wrapTitle); 
				}
				//callback when done
				options.callback.call(this);	
			}
			
			function blockHasImg() {
				var hasImg = true,
					 elem = $(".pd-block");
				elem.each(function() {
					$(this).find(".pd-title + p:has(img)").addClass("pd-img");				
					if($(this).find(".pd-img").length <= 0) {
						$(this).addClass("pd-no-img");
						hasImg = false;
					 }
				});	
				return hasImg;
			}
			
			//alternate function
			function altBlocks(order) {
				if (order == "even" ) {
					$(".pd-block:even").addClass("pd-alt");
				} else if (order == "odd" ) {
					$(".pd-block:odd").addClass("pd-alt");
				} 
			} 	
			
			function moveTitles() {
				var elem = $('.pd-block');
				elem.each(function() {								
					$(this).find(".pd-img").insertBefore($(this).find(".pd-title")); 	
				});
			}		
			
			function alignContent(wt) {			
				var elem = $('.pd-block');		
				elem.each(function() {
					var imgHeight = objHeight,
					bodyHeight = $(this).find(".pd-body").height();
					$(this).find(".pd-img, .pd-anchor").insertBefore($(this).find(".pd-body"));
					$(this).find('.pd-body, .pd-img').wrapAll('<div class="pd-wrap" />');
					if ( wt == false ) {		
						$(this).find('.pd-title, .pd-anchor').insertBefore($(this).find(".pd-wrap"));
					}
					if ( bodyHeight <= imgHeight ) {					
						$(this).find(".pd-wrap").addClass("pd-align");	
					}
					//if using flex add order:2 to align-right
					$(this).find(".elem-right").parent().addClass("pd-align-alt"); 
				});				 
			}		
			
			function scrollToAnchor(target) {
				var $target = $("a[name='" + target.substr(1) + "']"),
					 targetName = window.location.href.split("#")[1];
				$('html, body').animate({
					'scrollTop': $target.offset().top - 20
				}, 700, function () {
					document.location.hash = targetName;
				});
			}					
		}//end tntdivider
	});//end extend
})(jQuery);
