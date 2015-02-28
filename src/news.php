<!DOCTYPE html>
<html data-ng-app="iwct">

<head>
	<!-- Define Charset -->
	<meta charset="utf-8" />
	<!-- Page Title -->
	<title>IWCT - News</title>

	<!-- Responsive Metatag -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

	<!-- CSS -->
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">

	<!-- Font icons -->
	<link rel="stylesheet" href="css/vendors/fontello.min.css">
	<!--[if IE 7]>
	<link rel="stylesheet" href="css/fontello-ie7.css" ><![endif]-->

	<!-- Custom CSS -->
	<link rel="stylesheet" href="css/styles.min.css" />

	<!-- Custom Media-Queties -->
	<link rel="stylesheet" href="css/media-queries.min.css" />

	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Media queries -->
	<!--[if lt IE 9]>
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
	<![endif]-->
	
	<meta property="og:url" content="<? echo "https://www.iwct-uk.org/social_news.php?tag=" . htmlspecialchars($_GET["tag"])?>">

</head>


<body>
	<!-- begin Header -->
	<header class="header-home" id="home">
		<iwct-navbar></iwct-navbar>
	</header>
	<div class="container">
		<h1 style="background:none;">News</h1>
		<div class="row newsArticleMain">
			<div data-ng-controller="newsController as ctrl" class="newsArticle col-md-9">
				<h3>{{newsArticle.title}}</h3>
				<subtitle>{{newsArticle.date}}</subtitle>
				<figure style="margin-bottom:30px">
					<img data-ng-src={{newsArticle.image}}-medium.jpg data-ng-srcset="{{newsArticle.image}}-small.jpg 320w, {{newsArticle.image}}-medium.jpg 640w, {{newsArticle.image}}-large.jpg 1024w" class="title">
					<figcaption data-ng-bind-html="newsArticle.title_caption"></figcaption>
				</figure>
				<p data-ng-bind-html="newsArticle.text"></p>
				<div class="row">
					<div class="col-md-12">
						<pager total-items="totalItems" data-ng-model="newsIndex" items-per-page="1"></pager>
					</div>
				</div>
				<div class="news news-single" style="background:#fff">
					<aside class="share">
						Share this story on:
						<a data-ng-href="https://twitter.com/share?url=https%3A%2F%2Fwww.iwct-uk.org%2Fnews.php%3Ftag%3D{{newsArticle.tag}}&text={{newsArticle.title|escape}}"><i class="icon-twitter"></i></a>

						<a href="" data-ng-click="shareNews();">
							<i class="icon-facebook"></i>
						</a>
						<!--<a  ng-href="https://plus.google.com/share?url=https%3A%2F%2Fwww.iwct-uk.org%2Fnews.php%3Ftag%3D{{newsArticle.tag}}" onclick="javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><i class="icon-gplus"></i></a>-->
						<!--<a href="#"><i class="icon-pinterest"></i></a>-->
						<!--<a href="#"><i class="icon-linkedin"></i></a>-->
						<!--<a href="#"><i class="icon-dribbble"></i></a>-->
					</aside>
				</div>
			</div>
			<div class="col-md-3">
				<div class="row">
					<iwct-residents></iwct-residents>
				</div>
			</div>
		</div>
	</div>
	<iwct-footer></iwct-footer>


	<!-- ******************************************************************** -->
	<!-- ************************* Javascript Files ************************* -->

	<!-- jQuery -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<!-- Import AngularJS -->
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-sanitize.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.0/ui-bootstrap-tpls.min.js"></script>

	<!-- Respond.js media queries for IE8 -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>

	<!-- Bootstrap-->
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>


	<!-- Placeholder.js -->
	<!--[if lte IE 9]> <script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js" ></script> <script>Placeholder.init();</script> <![endif]-->

	<!-- Custom -->
	<script src="js/script.min.js"></script>

	<!-- *********************** End Javascript Files *********************** -->
	<!-- ******************************************************************** -->

</body>

</html>
