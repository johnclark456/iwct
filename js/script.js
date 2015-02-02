/**
 * The script is encapsulated in an self-executing anonymous function,
 * to avoid conflicts with other libraries
 */
(function($) {
	/**
	 * Declare 'use strict' to the more restrictive code and a bit safer,
	 * sparing future problems
	 */
	"use strict";

	/***********************************************************************/
	/*****************************  $Content  ******************************/
	/**
	* + Content
	* + Collapse Icon
	* + Donations Steps
	* + Fancybox
	* + Select Amount
	* + Send Forms
	* + Tabs
	* + Tootips

	*/

	/***************************  $Collapse Icon  **************************/
	function changeIcon(e, icons) {
		var $emt = $(e.target).parents('.panel'),
			$ico = $emt.find('h4 a i'),
			evt = e.type,
			isIn = ($emt.find('.panel-collapse').hasClass('in')),
			icoClosed = icons[0], //icon when panel is close
			icoOpen = icons[1], //icon when panel is open
			icoHover = icons[2]; //icon when panel is hover

		$ico.removeClass();

		if (evt == 'show') {
			$ico.addClass(icoOpen);
		}
		else if (evt == 'hide') {
			$ico.addClass(icoClosed);
		}
		else if (evt == 'mouseenter') {
			$ico.addClass(icoHover);
		}
		else if (evt == 'mouseleave') {
			(isIn) ? $ico.addClass(icoOpen): $ico.addClass(icoClosed);
		}
	}

	function bindChangeIcon(collapse, heading, icons) {
		collapse.on('hide.bs.collapse', function(e) {
			changeIcon(e, icons);
		});
		collapse.on('show.bs.collapse', function(e) {
			changeIcon(e, icons);
		});
		heading.on('mouseenter', function(e) {
			changeIcon(e, icons);
		});
		heading.on('mouseleave', function(e) {
			changeIcon(e, icons);
		});
	}

	var $collapse = $('#accordion-work'),
		$heading = $collapse.find('.panel-heading'),
		icons = ['icon-down-circled', 'icon-up-circled', 'icon-down-circled'];

	bindChangeIcon($collapse, $heading, icons);

	/**************************  $Donations Steps  *************************/
	$('.btn-tab-action').click(function(e) {
		e.preventDefault();
		$('#donation-steps a[href="' + $(this).attr('href') + '"]').tab('show');
	});


	/****************************  $Fancybox  *******************************/
	if ($('.fancybox').length) {
		$('a[data-rel]').each(function() {
			$(this).attr('rel', $(this).data('rel'));
		});

		$(".fancybox").fancybox({
			openEffect: 'none',
			closeEffect: 'none'
		});
	}

	/***************************  $Menu Sticky  ****************************/

	$(window).scroll(function() {
		var $head = $('body > header'),
			$navbar = $head.find('.navbar'),
			offset = 250,
			height = $navbar.height() + offset;

		if ($(window).scrollTop() >= height && !$navbar.hasClass('navbar-fixed-top')) {

			$navbar.css('top', -150);
			$navbar.addClass('navbar-fixed-top');
			$navbar.animate({
				'top': 0
			}, 300);

		}
		else if ($(window).scrollTop() < height && $navbar.hasClass('navbar-fixed-top')) {
			$navbar.removeClass('navbar-fixed-top');
		}

	});





	/*************************  $One Page Scroll  **************************/
	$('.navbar-nav').onePageNav({
		currentClass: 'active',
		filter: ':not(.exclude)',
	});



	/***************************  $Select Amount  **************************/
	$('.amount .radio').click(function(e) {
		var val = $('[name=amountRadio]:checked').val();

		$('.amount .radio').removeClass('active');
		$(this).addClass('active');

		if (val == 'other') {
			$('#amount-other').show();
		}
		else {
			$('#amount-other').hide();

		}
	});



	/**************************  $Send Forms  ******************************/
	var $form = $('form');

	$form.on('submit', function(e) {
		if ($(this).data('ajax') == 1) {
			e.preventDefault();
			sendForm($(this));
		}
	});

	function sendForm($form) {
		var fieldsData = getFieldsData($form),
			url = $form.attr('action'),
			method = $form.attr('method');

		sendData(url, method, fieldsData, $form, showResults);
	}


	function getFieldsData($form) {
		var $fields = $form.find('input, button, textarea, select'),
			fieldsData = {};

		$fields.each(function() {
			var name = $(this).attr('name'),
				val = $(this).val(),
				type = $(this).attr('type');

			if (typeof name !== 'undefined') {

				if (type == 'checkbox' || type == 'radio') {

					if ($(this).is(':checked')) {
						fieldsData[name] = val;
					}
				}
				else {
					fieldsData[name] = val;
				}

			}
		});

		return fieldsData;
	}

	function sendData(url, method, data, $form, callback) {
		var $btn = $form.find('[type=submit]'),
			$response = $form.find('.form-response');

		$.ajax({
			beforeSend: function(objeto) {
				$response.html('');
			},
			complete: function(objeto, exito) {},
			data: data,
			success: function(dat) {
				callback(dat, $response);
			},
			type: method,
			url: url,
		});
	}

	function showResults(data, $response) {
		$response.html(data);
		$response.find('.alert').slideDown('slow');
	}

	/*******************************  $Tabs  *******************************/
	$('.nav-tabs a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});



	/*****************************  $Tootips  ******************************/
	function changeTooltipColorTo(color) {
		//solution from: http://stackoverflow.com/questions/12639708/modifying-twitter-bootstraps-tooltip-colors-based-on-position
		$('.tooltip-inner').css('background-color', color);
		$('.tooltip.top .tooltip-arrow').css('border-top-color', color);
		$('.tooltip.right .tooltip-arrow').css('border-right-color', color);
		$('.tooltip.left .tooltip-arrow').css('border-left-color', color);
		$('.tooltip.bottom .tooltip-arrow').css('border-bottom-color', color);
	}

	$('.donation-item .progress-bar').tooltip({
		placement: 'top'
	});
	$('.donation-item .progress-bar').hover(function() {
		changeTooltipColorTo('#d91d2b');
	});



})(jQuery);

function doDonationSubmit() {

	var j = $('input[name="amountRadio"]:checked').val();

	if (j == "other")
		j = $("#amount-other").val();

	$('#amountField').val(j);
	return true;
}


(function() {
	var app = angular.module('iwct', ['ui.bootstrap', 'ngSanitize']);

	app.controller("footerCtrl", ['$scope', '$timeout',
		function($scope, $timeout) {
			$timeout(function() {
				if (typeof twttr !== 'undefined') {
					twttr.widgets.load();
				}
			});
		}
	]);

	app.filter('htmlToPlaintext', function() {
		return function(text) {
			return String(text).replace(/<[^>]+>/gm, '');
		}
	});


	app.filter('characters', function() {
		return function(input, chars, breakOnWord) {
			if (isNaN(chars)) return input;
			if (chars <= 0) return '';
			if (input && input.length > chars) {
				input = input.substring(0, chars);

				if (!breakOnWord) {
					var lastspace = input.lastIndexOf(' ');
					//get last space
					if (lastspace !== -1) {
						input = input.substr(0, lastspace);
					}
				}
				else {
					while (input.charAt(input.length - 1) === ' ') {
						input = input.substr(0, input.length - 1);
					}
				}
				return input + '…';
			}
			return input;
		};
	});

	app.directive("iwctFooter", function() {
		return {
			restrict: 'E',
			templateUrl: "footer.html",
			controller: "footerCtrl"
		};
	});

	app.directive("iwctNavbar", function() {
		return {
			restrict: 'E',
			templateUrl: "navbar.html"
		};
	});

	app.directive("iwctResidents", function() {
		return {
			restrict: 'E',
			template: "<div class=\"donation-item resume\"><h4>Our residents</h4><p>Meet some of our lovely residents, all hoping to find new homes</p><div class=\"foot\"><a class=\"btn sponsor-btn\" href=\"residents\">View residents</a></div><div class=\"row\"><figure style=\"margin-left:auto;margin-right:auto;width:80%\"><img src=\"img_resp/DSCF0689-small.JPG\" srcset=\"img_resp/DSCF0689-small.JPG 320w, img_resp/DSCF0689-meduim.JPG 640w, img_resp/DSCF0689-large.JPG 1024w\" style=\"box-shadow: 0 0 10px #000;margin-top: 15px;margin-bottom: 15px;\"></figure></div></div>"
		};
	});

	app.directive("iwctNewsletter", function() {
		return {
			restrict: 'E',
			template: "<div style=\"max-width:400px; margin:auto;\" id=\"subscribe\"><h4>Subscribe to our newsletter</h4><form name=\"newsForm\" novalidate data-ng-controller=\"newsletterCtrl\"><div data-ng-hide=\"newsletterSubmitted\"><div class=\"form-group\"><label for=\"name\" class=\"sr-only\">Name</label><i class=\"icon-user\"><input type=\"text\" class=\"form-control\" data-ng-model=\"user.name\" placeholder=\"Name\" required/></i></div><div class=\"form-group\"><label for=\"email\" class=\"sr-only\">Email</label><i class=\"icon-mail\"><input type=\"email\" class=\"form-control\" data-ng-model=\"user.email\" placeholder=\"Email\" required/></i></div><input type=\"submit\" value=\"Submit\" class=\"btn center-block btn-form\" data-ng-click=\"newsForm.$valid && update(user)\" style=\"margin-bottom:30px\" data-ng-disabled=\"!newsForm.$valid\" /></div><div data-ng-show=\"newsletterSubmitted\"><h3 style=\"text-align:center\">Thank You</h3></div></form></div>"
		};
	});

	app.controller("newsletterCtrl", ['$scope', '$http',
		function($scope, $http) {

			$scope.newsletterSubmitted = false;

			$scope.update = function(user) {
				$http({
					method: "post",
					url: "newsletter.php",
					data: {
						name: user.name,
						email: user.email
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				});
				$scope.newsletterSubmitted = true;
			};
		}
	]);

	app.controller("newsController", ['$scope', '$http',
		function($scope, $http) {
			$scope.news = [];
			$scope.currentPage = 1;
			$scope.numPerPage = 2;
			$scope.maxSize = 5;
			$scope.totalItems = 0;
			$scope.begin = 0;
			$scope.newsArticle = 1;

			$http.get('news.json').success(function(data, status, headers, config) {
				$scope.news = data;
				$scope.totalItems = $scope.news.length;
				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
				var end = begin + $scope.numPerPage;
				$scope.filteredNews = $scope.news.slice(begin, end);
				var tag = getParameterByName('tag');
				var i = null;
				for (i = 0; data.length > i; i += 1) {
					if (data[i].tag === tag) {
						$scope.newsIndex = i + 1;
						$scope.newsArticle = $scope.news[$scope.newsIndex - 1];
						break;
					}
				}
			});

			$scope.$watch('newsIndex', function() {
				$scope.newsArticle = $scope.news[$scope.newsIndex - 1];
			});

			$scope.$watch('currentPage + numPerPage', function() {
				$scope.begin = (($scope.currentPage - 1) * $scope.numPerPage);
				var end = $scope.begin + $scope.numPerPage;
				$scope.filteredNews = $scope.news.slice($scope.begin, end);
			});
			
			$scope.shareNews = function() {
				FB.ui({
					method: 'share',
					href: 'https://www.iwct-uk.org/news.php?tag=' + $scope.newsArticle.tag,
				}, function(response) {});
			};
		}
	]);

	app.controller("adoptController", ['$scope', '$modal', '$http',
		function($scope, $modal, $http) {
			$scope.filteredDogs = [];
			$scope.currentPage = 1;
			$scope.numPerPage = 3;
			$scope.maxSize = 5;
			$scope.totalItems = 0;

			$scope.dogs = [];
			$http.get('sponsorship.json').success(function(data, status, headers, config) {
				$scope.dogs = data;
				$scope.totalItems = $scope.dogs.length;
			});


			$scope.$watch('currentPage + numPerPage + dogs', function() {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
				var end = begin + $scope.numPerPage;
				$scope.filteredDogs = $scope.dogs.slice(begin, end);
			});


			$scope.openAdopt = function(dog) {
				var modalInst = $modal.open({
					templateUrl: 'adoptDialog.html',
					controller: 'ModalInstanceCtrl',
					controllerAs: 'ctrl',
					resolve: {
						selectedDog: function() {
							return dog;
						}
					}
				});
			};

		}
	]);
	
	app.filter('escape', function() {
  	return window.encodeURIComponent;
	});

	app.controller("ModalInstanceCtrl", ['$scope', '$modalInstance', '$log', 'selectedDog',
		function($scope, $modalInstance, $log, selectedDog) {
			$scope.selectedDog = selectedDog;

			$scope.ok = function() {
				$modalInstance.close($scope.selectedDog);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};
		}
	]);



})();


window.fbAsyncInit = function() {
	FB.init({
		appId: '412689262221901',
		xfbml: true,
		version: 'v2.1'
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_GB/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-58901653-1', 'auto');
ga('send', 'pageview');
