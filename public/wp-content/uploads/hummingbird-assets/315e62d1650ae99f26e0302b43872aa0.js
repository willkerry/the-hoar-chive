/**handles:cyanotype-script**/
/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

( function( $ ) {
	var $body         = $( document.body ),
	    $window       = $( window ),
	    sidebar       = $( '#sidebar' ),
	    sidebarToggle = $( '#masthead' ).find( '#sidebar-toggle' ),
	    resizeTimer,
	    toolbarHeight,
	    mastheadHeight,
	    headerImageHeight;

	// Add dropdown toggle that display child menu items.
	$( '#sidebar .main-navigation .menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + screenReaderText.expand + '</button>' );

	// Toggle buttons and submenu items with active children menu items.
	$( '#sidebar .main-navigation .current-menu-ancestor > button' ).addClass( 'toggle-on' );
	$( '#sidebar .main-navigation .current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

	$( '.dropdown-toggle' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		_this.toggleClass( 'toggle-on' );
		_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
		_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
		_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
	} );

	// Move the Page Links before Sharedaddy.
	$( '.single .hentry' ).each( function() {
		$( this ).find( '.page-links' ).insertBefore( $( this ).find( '.sharedaddy' ).first() );
	} );

	// Enable sidebar toggle.
	( function() {
		if ( ! sidebar || ! sidebarToggle ) {
			return;
		}

		sidebarToggle.on( 'click.cyanotype', function() {
			$body.toggleClass( 'sidebar-open' ).trigger( 'resize' );
			$( this ).toggleClass( 'toggled-on' );
			$( this ).attr( 'aria-expanded', sidebar.attr( 'aria-expanded' ) === 'true' ? 'false' : 'true');
			sidebar.attr( 'aria-hidden', sidebar.attr( 'aria-hidden' ) === 'false' ? 'true' : 'false');
		} );
	} )();

	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	( function() {
		var menu = $( '#masthead' ).find( '.nav-menu' );
		if ( ! menu || ! menu.children().length ) {
			return;
		}

		if ( 'ontouchstart' in window ) {
			menu.find( '.menu-item-has-children > a' ).on( 'touchstart.cyanotype', function( e ) {
				var el = $( this ).parent( 'li' );

				if ( ! el.hasClass( 'focus' ) ) {
					e.preventDefault();
					el.toggleClass( 'focus' );
					el.siblings( '.focus' ).removeClass( 'focus' );
				}
			} );
		}

		menu.find( 'a' ).on( 'focus.cyanotype blur.cyanotype', function() {
			$( this ).parents( '.menu-item' ).toggleClass( 'focus' );
		} );
	} )();

	// Minimum height for sidebar.
	function sidebarSize() {
		var sidebarMinHeight;

		if ( ! sidebar ) {
			return;
		}

		toolbarHeight     = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;
		mastheadHeight    = $( '#masthead' ).outerHeight();
		headerImageHeight = $( '.header-image' ).height();
		sidebarMinHeight  = $window.height() - ( toolbarHeight + mastheadHeight + headerImageHeight );

		sidebar.css( {
			'min-height': sidebarMinHeight + 'px'
		} );
	}

	// Add body classes to modify layout.
	function bodyClasses() {
		if ( $window.width() > 827 ) {
			var siteBranding           = $( '.site-branding' ),
			    siteBrandingWidth      = siteBranding.width(),
			    siteBrandingInnerWidth = siteBranding.find( '.site-branding-inner' ).width(),
			    socialNavigationWidth  = siteBranding.find( '.social-navigation' ).width();

			if ( siteBrandingWidth < ( siteBrandingInnerWidth + socialNavigationWidth ) ) {
				$body.addClass( 'social-menu-left' );
			} else {
				$body.removeClass( 'social-menu-left' );
			}
		} else {
			$body.removeClass( 'social-menu-left' );
		}
	}

	// Add a class to big image and caption >= 960px.
	function bigImageClass() {
		var entryContent = $( '.entry-content' );
		entryContent.find( 'img.size-full, img.size-large' ).each( function() {
			var img = $( this ),
			    caption = $( this ).closest( 'figure' ),
			    newImg = new Image();

			newImg.src = img.attr( 'src' );

			$( newImg ).load( function() {
				var imgWidth = newImg.width;

				if ( imgWidth >= 960 ) {
					$( img ).addClass( 'size-big' );
				}

				if ( caption.hasClass( 'wp-caption' ) && imgWidth >= 960 ) {
					caption.addClass( 'caption-big' );
					caption.removeAttr( 'style' );
				}
			} );
		} );
	}

	// Make Post Navigation full-width on large screen.
	function postNav() {
		var postNav       = $( '.post-navigation' ),
		    windowWidth   = $window.width(),
		    postNavMargin = 0,
		    postNavWidth;

		if ( ! $body.hasClass( 'single' ) ) {
			return;
		} else if ( 1088 < windowWidth ) {
			postNavMargin = ( windowWidth - ( 1088 + 4 ) ) / 2;
			postNav.css( {
				'width': windowWidth + 'px',
				'margin-left':  '-' + postNavMargin + 'px',
				'margin-right':  '-' + postNavMargin + 'px'
			} );
		} else {
			postNav.attr( 'style', '' );
		}
	}

	// Close Sidebar with an escape key.
	$( document ).keyup( function( e ) {
		if ( e.keyCode === 27 && sidebarToggle.hasClass( 'toggled-on' ) ) {
			$body.removeClass( 'sidebar-open' );
			sidebarToggle.removeClass( 'toggled-on' ).attr( 'aria-expanded', 'false' );
			sidebar.attr( 'aria-hidden', 'true' );
		}
	} );

	$( document ).ready( function() {
		$window.on( 'resize.cyanotype', function() {
			clearTimeout( resizeTimer );
			resizeTimer = setTimeout( function() {
				sidebarSize();
				bodyClasses();
				postNav();
			}, 300 );
		} );

		sidebarSize();
		bodyClasses();
		bigImageClass();
		postNav();

		for ( var i = 1; i < 4; i++ ) {
			setTimeout( sidebarSize, 100 * i );
			setTimeout( bodyClasses, 100 * i );
			setTimeout( postNav, 100 * i );
		}
	} );
} )( jQuery );