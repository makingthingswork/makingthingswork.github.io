'use strict';

/* globals jsonObject */
/* exported jsonObject */
/* globals bodyScrollLock */
/* exported bodyScrollLock */
/* eslint-disable no-unused-vars */

const win = window, 
  doc = document;										// Declare constant for window, document object

const console = (win.console = win.console || {});

const colors = jsonObject.colors;		// Set const from global json object

const d = new Date(); 							// Date object
var n = d.getDay();									// Get numerical identifier for current day of the week
n = (n === 6)? 2 : n;								// With only six colours (max index 5) if the day is 6 (Sunday) then set it to 2 (blue) so all 7 days have a colour
    
// const randomTheme = colors[Math.floor(Math.random() * colors.length)].toLowerCase();
const dayOfTheWeekTheme = colors[n]; // Set default theme based on day of the week

// Set current; check for existence of localStorage item otherwise set to day of the week  
const currentTheme = (typeof localStorage.getItem('mtw-settings') !== 'undefined' && localStorage.getItem('mtw-settings') !== null) ? JSON.parse(localStorage.getItem('mtw-settings')).theme : dayOfTheWeekTheme;

/**
*
*    GENERAL
* 
*/
/**
* @desc     executes a console.log action
* @method   log
* @param    string str message to be dispalyed
* @return   {Object} Returns object with width, height
*/
var log = str => console.log(str);

/**
* @desc     querySelector in jQuery style but using _$ instead of $
* @method   _$
* @param    string selector specifies one or more CSS selectors to match the element.
* @return   {object} Returns node object / {Array} Returns array of node objects
*/
var _$ = selector => {
	return document.querySelector(selector);			// Returns first element var links = $('#links').getElementsByTagName('li');
  //return document.querySelectorAll(selector);	// Returns all matching elements var links = $('#links li');
};

// Add class to html tag for IE or iOS depending on the user agent
if(navigator.userAgent.toLowerCase().indexOf('msie') !== -1) { _$('html').classList.add('ie'); } 				// Check for IE
if(navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)) { _$('html').classList.add('ios'); }	// Check for iOS

// Listeners for loading events
win.addEventListener('DOMContentLoaded', (event) => {
	log('DOM is ready.');
	_$('.year').innerHTML = d.getFullYear();		// Set current year in credits
	_$('body').classList.add(currentTheme);			// Add currentTheme class to body
});

win.addEventListener('load', (event) => {
  log('Page is fully loaded including dependent resources.');
	_$('main').classList.add('reveal');		// Reveal main content
	_$('footer').classList.add('reveal');	// Reveal footer content
});

/**
* @desc     returns the width & height of viewport acuurately and reliably
* @method   viewport
* @param    
* @return   {Object} Returns object with width, height
*/
var viewport = () => {
	var e = window, a = 'inner';
  if (!( 'innerWidth' in window)){
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[a+'Width'], height : e[a+'Height'] };
};

/**
* @desc     toggles a specified modal between open and closed
* @method   modal
* @param    object btn the clicked button element
* @task		  toggle 'open' class on target modal, toggle aria-hidden status and add overflow-hidden class to body     
*/
var modal = btn => {
	var target = btn.getAttribute('data-target');															// Get modal to target from data-target
	var el = _$(`#${target}-modal`);																					// Get the modal element
  el.classList.toggle('open');																							// Toggle modal class to 'open'
  el.getElementsByClassName('modal-content')[0].classList.toggle('reveal');	// Toggle modal content class to 'reveal'
  (el.classList.contains('open')) ? 
  bodyScrollLock.disableBodyScroll(el) : 
  bodyScrollLock.enableBodyScroll(el);                                      // Toggle body-scrol-lock
};

/**
* @desc     a class 'show' is added when the image has loaded
* @method   checkImageLoaded
* @param    object img passed image element
* @task		  add class 'show' to image
*/
var checkImageLoaded = img => {
	if(img.complete){ img.classList.add('show'); }
};

/**
* @desc     adjusts the display state based on filter choices
* @method   filterByCategory
* @param    object btn the clicked button element
* @task		  sets display to display or none
*/
var filterByCategory = btn => {
  var cat = btn.getAttribute('data-category');
  var articles;
  if(typeof cat !== 'undefined' && cat !== null){
    articles = doc.querySelectorAll('article');
    [...articles].map(result => result.style.display = 'none');
    articles = doc.querySelectorAll('article[data-categories*="'+cat+'"]');
    [...articles].map(result => result.style.display = 'block');
  }else{
    articles = doc.querySelectorAll('article');
    [...articles].map(result => result.style.display = 'block');
  }
};

/**
* @desc     scrolls the user back to the top
* @method   backToTop
* @param    string val part of the id of the target modal
* @task		  executes a scroll event
*/
var backToTop = val => {
	var el = (typeof val !== 'undefined' && val !== null) ? _$(`#${val}-modal`) : win;
	el.scroll({ top: 0, behavior: 'smooth'});
};

/**
*
*    THEME
* 
*/
/**
* @desc     object for theme with init, content methods
* @method   theme 
* @return   init  {Array} Theme colors, {String} Current theme name, {Function} Return active class, {Function} Updates current theme class & stores in localStorage 
* @return   content  {Boolean} set posts is loading status false, {Boolean} set categories is loading status false, {Object} all post data object defaults to null,, {Object} post data object defaults to null, {Object} single post data object defaults to null, {Object} categories data object defaults to null, {Function} Return posts data, {Function} Return categories data,  {Function} filter data by category, {Function} Return background image, {Function} check field to determine visibility, {Function} create Url link
*/
var theme = {
	init: function(){
		return {
			themes: colors,
			themeClass: currentTheme,
	        activeState(themeName){
	        	// Check current theme and if a match set class active to true
	        	var classes = (themeName === this.themeClass) ? { 'active': true } : { 'active': false };
	        	return classes;
	        },
	        changeTheme(className){
	        	// Update themeClass to the new theme value
	        	this.themeClass = this.themes.find(function(value){ return value === className; });
	        	var obj = {};
	        	if(typeof localStorage.getItem('mtw-settings') !== 'undefined' && localStorage.getItem('mtw-settings') !== null){
	        		// Object exists so update the key with the new value
	        		obj = JSON.parse(localStorage.getItem('mtw-settings'));
	        		obj.theme = this.themeClass
	        	}else{
	        		obj = { theme: this.themeClass }; 													// No exisiting object so create key & value
	        	}
	        	localStorage.setItem('mtw-settings', JSON.stringify(obj)); 		// Update Local storage
	        	_$('body').classList.remove(...this.themes);  								// Remove body class of colour using spread operator
	        	_$('body').classList.add(this.themeClass); 										// Add current colour class to body
	        }
	    };
	},
	content: function(){
		return {
			postsLoading: false,
			categoriesLoading: false,
			allData: null,
			filterData: null,
			postContent: null,
			categoriesData: null,
			posts(){
				this.postsLoading = true;
          fetch('data/posts.json')
          .then(response => response.json())
          .then(data => {
              this.postsLoading = false;
              this.allData = this.filterData = data;
          });
			},
			categories(){
				this.categoriesLoading = true;
          fetch('data/categories.json')
          .then(response => response.json())
          .then(data => {
              this.categoriesLoading = false;
              this.categoriesData = data;
          });
			},
			//filterByCategory(cat){
        //this.filterData = (typeof cat !== 'undefined' && cat !== null) ? this.allData.filter(result => result.categories.includes(cat)) : this.allData;
      //},
			backgroundImage(imgUrl){
        //console.log(imgUrl);
				var styles = `background-image:url(${imgUrl})`;
				return styles;
			},
			readMore(postId){
				this.postContent = null;
				this.postContent = this.filterData.find(result => { return result.id === postId; });
			},
			checkField(value){
				var styles = (typeof value !== 'undefined' && value !== null && value !== '' && value != false) ? '' : 'display:none;';
				return styles;
			},
			createUrlLink(url){
				var cleanUrl = url.replace(/(^\w+:|^)\/\//, ''); 		//Remove protocol from Url
				var urlLink = `<a href="${url}" target="_blank" class="underline hover:no-underline" rel="noreferrer">${cleanUrl}</a>`;
				return urlLink;
			}
		};
	}
};