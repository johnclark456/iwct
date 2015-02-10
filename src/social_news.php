<?php
  $news = file_get_contents("news.json");
	$news = json_decode($news);
	$tag = htmlspecialchars($_GET["tag"]);
	
	
	foreach ($news as $item) { // This will search in the 2 jsons
	  if ($item->tag == $tag) {
	    $title = $item->title;
	    $image = 'https://www.iwct-uk.org/' . $item->image . "-large.jpg";
	    $description = $item->text;
	  }
}
  
  ?>
  
  <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" /> 
            <meta property="og:title" content="<?php echo $title; ?>" />
            <meta property="og:image" content="<?php echo $image; ?>" />
            <!-- etc. -->
            <link rel="canonical" href="<? echo "https://www.iwct-uk.org/news.php?tag=" . htmlspecialchars($_GET["tag"])?>">
        </head>
        <body>
            <p><?php echo $description; ?></p>
            <img src="<?php echo $image; ?>">
        </body>
    </html>
