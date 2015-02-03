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

	/*************************** $Menu Sticky ****************************/

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





	/************************* $One Page Scroll **************************/
	$('.navbar-nav').onePageNav({
		currentClass: 'active',
		filter: ':not(.exclude)',
	});


	/******************************* $Tabs *******************************/
	$('.nav-tabs a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});




})(jQuery);


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

	app.controller("dogTalesController", ['$scope', '$http',
		function($scope, $http) {
			$scope.dogTales = [];
			$http.get('tales.json').success(function(data, status, headers, config) {
				$scope.dogTales = data;
			});

			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
				document.getElementById('newsSlider').className = 'newsSlider';
				$('.bxslider').bxSlider({
					auto: true,
					autoHover: true,
					autoStart: true,
					pager: true,
					controls: false,
					speed: 1000,
					pause: 10000,
					adaptiveHeight: false
				});
			});
		}
	]);

	app.directive('onFinishRender', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function() {
						scope.$emit(attr.onFinishRender);
					});
				}
			}
		}
	});

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
