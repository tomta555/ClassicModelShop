/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Init Menu
3. Init Isotope


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var menu = $('.menu');
	var burger = $('.hamburger');
	var menuActive = false; 

	$(window).on('resize', function()
	{
		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	initMenu();
	initIsotope();

	/* 

	2. Init Menu

	*/

	function initMenu()
	{
		if(menu.length)
		{
			if($('.hamburger').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	3. Init Isotope Filtering

	*/
$(document).ready(function(){
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.item'
  });

  // store filter for each group
  var filters = {};

  $('.filters').on('change', '.filters-select', function(){
    var $this = $(this);
    //var selectGroup = $this.parents('.button-group');
    var filterGroup = $this.attr('data-filter-group');

    filters[ filterGroup ] = $this.val();

    var filterValue = concatValues( filters );

    $grid.isotope({ filter: filterValue });

    console.log(filterGroup, filterValue);
  });

  // flatten object by concatting values
  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }
});

$(document).ready(function(){
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.item'
  });

  // store filter for each group
  var filters = {};

  $('.filters').on('change', '.filters-select', function(){
    var $this = $(this);
    //var selectGroup = $this.parents('.button-group');
    var filterGroup = $this.attr('data-filter-group');

    filters[ filterGroup ] = $this.val();

    var filterValue = concatValues( filters );

    $grid.isotope({ filter: filterValue });

    console.log(filterGroup, filterValue);
  });

  // flatten object by concatting values
  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }
});
    function initIsotope()
    {
    	var sortingButtons = $('.item_sorting_btn');

    	if($('.grid').length)
    	{
    		var grid = $('.grid').isotope({
	  			itemSelector: '.grid-item',
	  			percentPosition: true,
	  			masonry:
	  			{
				    horizontalOrder: true
			  	},
			  	getSortData:
	            {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_title'
	            }
	        });

	        sortingButtons.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		var parent = $(this).parent().parent().find('.isotope_sorting_text span');
		        		parent.text($(this).text());
		        		var option = $(this).attr('data-isotope-option');
		        		option = JSON.parse( option );
	    				grid.isotope( option );
	        	});
			});
			
			 
			// Filtering
			var filters = {};
	        $('.item_filter_btn').on('click', function()
	        {
				//set parent to currently select
	        	var parent = $(this).parent().parent().find('.isotope_filter_text span');
				parent.text($(this).text());

				var $this = $(this);
		        // var filterValue = $(this).attr('data-filter');
				// grid.isotope({ filter: filterValue });
				var $buttonGroup = $this.parents('.dropdown-group');
				var filterGroup = $buttonGroup.attr('data-filter-group');
				filters[ filterGroup ] = $this.attr('data-filter');

				var filterValue = concatValues( filters );
				grid.isotope({ filter: filterValue });

			});

			function concatValues( obj ) {
				var value = '';
				for ( var prop in obj ) {
				  value += obj[ prop ];
				}
				return value;
			  }
 
    	}
	}
	


});


// fucntion to fix text and "Add to cart" button not showing in some product
function allVClick(){
	document.getElementById("allVendor").click();
}