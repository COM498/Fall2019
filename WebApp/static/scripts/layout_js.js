jQuery(window).resize(function()  
{  
    var ratio = 3/4; // height / width  
    jQuery('#resizeMe').height( jQuery('#resizeMe').width() * ratio );  
});  
  
// When the page loads, trigger a window resize event  
// so our element gets resized by default. Saves having   
// to duplicate the same code on load too.  
jQuery(window).load(function()  
{  
    jQuery(window).trigger('resize');  
}); 