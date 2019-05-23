(function($){
	$.fn.rssreader = function(url, options, fn) {
		var options = $.extend({
			limit: 7,
			offset: 0,
			mainimage: true,
			header: true,
			listHeader: true,
			titletag: "h4",
			date: false,
			content: true,
			title: true,
			snippet: true,
			showerror: true,
			errormsg: "",
			linktarget: "_blank",
			linkredirect: "",
		}, options);

		return this.each(function(i, e) {
			var s = "";

			if (!$(e).hasClass("rssreader")) {
				$(e).addClass("rssreader");
			}

			if(url == null) {
				return false;
			}

			var apiUrl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=";
			var api = apiUrl + encodeURIComponent(url) + "&num=" + options.limit +"&output=json_xml";

			$.getJSON(api, function(data){
				if (data.responseStatus == 200) {
					_process(e, data.responseData, options);

					if ($.isFunction(fn)) {
						fn.call(this, $(e));
					}
				} else {
					if (options.showerror)
						if (options.errormsg != "") {
							var msg = options.errormsg;
						} else {
							var msg = data.responseDetails;
						};

						$(e).html('<span class="rssError">' + msg + '</span>');
				};
			});
		});
	};

	function _process(e, data, options) {
		var feeds = data.feed;
		var rowArray = [];
		var rowIndex = 0;
		var html = "";
		var row;

		if (!feeds) {
			return false;
		}

		if (options.listHeader) {
			html +=	'<div class="rss-fee-list-header">' + '<h3><img src="assets/dashboard/rss-feed-default.png" /><span class="title">RSS Feed</span><span class="pull-right feed-link">('+ feeds.link.replace("http://", "") +')</span></h3>' + '</div><div class="rss-reload-section"><i class="fa fa-refresh" aria-hidden="true"></i><span>REFRESH FEED</span></div>';
	 	}
		
		if (options.header) {
			html +=	'<span>'+ feeds.link.replace("http://", "") +'</span><a href="javascript:void(0)" data-rel="'+feeds.feedUrl+'" class="btn rss-data-btn"><img src="assets/dashboard/rss-feed-active.png" /></a><a href="javascript:void(0)" class="delete"><img src="assets/dashboard/rss-delete.png" /></a>';
	 	}		

if(options.title){
		html += '<div class="rssBody">' + '<ul>';
}
		for (var i = options.offset; i < feeds.entries.length; i++) {
			rowIndex = i - options.offset;
			rowArray[rowIndex] = [];

			var entry = feeds.entries[i];
			var pubDate;
			var feedLink = entry.link;

			if (entry.publishedDate) {
				var entryDate = new Date(entry.publishedDate);
				var pubDate = entryDate.toLocaleDateString() + " " + entryDate.toLocaleTimeString();
			}

			if (options.linkredirect) {
				feedLink = encodeURIComponent(feedLink);
			}

			rowArray[rowIndex]["html"] =
				'<a href="javascript:void(0)" title=" ' +
				 feeds.title + '"><i class="fa fa-plus" aria-hidden="true"></i><span>'+ entry.title + '</span></a>'

			if (options.date && pubDate){
				rowArray[rowIndex]["html"] += "<time>" + pubDate + "</time>"
			}

			if (options.content) {
				if (options.snippet && entry.contentSnippet != "") {
					var content = entry.contentSnippet;
				} else {
					var content = entry.content;
				}

				rowArray[rowIndex]["html"] += "<p class='rss-feed-content-description'>" + entry.contentSnippet + " </p><div class='rss-feed-image-link'>"+ entry.link +"</div>";
			}	
		}
if(options.title){
		$.each(rowArray, function(e) {
			html += '<li class="rssRow">' + rowArray[e]["html"] + '</li>';
		});

		html += "</ul>" + "</div>";
}
		$(e).html(html);

		$("a", e).attr("target", options.linktarget);
		
		
		$('.feed-val-icon a').hover(function(){
			$(this).parents('.feed-val-icon').find('a.delete').stop().fadeIn(250);
		}, function(){
			$(this).parents('.feed-val-icon').find('a.delete').stop().fadeOut(250);
		});
		
		$('.feed-val-icon a.delete').click(function(){
			$(this).parents('.feed-val-icon').remove();
		});
		
		$('.feed-val-icon a.rss-data-btn').click(function(){
			url = $(this).attr('data-rel');
			
		$(".rss-feed-list").rssreader(url, {
			header: false,
			listHeader: true,
			title: true,
			content: true,
			snippet: false,
			showerror: false
		})			
		
		var left = $('.rss-feed-adding-section').offset().right;
		$(".rss-feed-adding-section").css({ right: left }).stop().animate({ "right": "-360px", "opacity": "0" }, "slow", function(){
			var left = $('.rss-feed-view-section').offset().right;
			$(".rss-feed-view-section").css({ right: left }).stop().animate({ "right": "0", "opacity": "1" }, "slow");	
		});	
			
		});
		
		$('.rssBody ul li a').click(function(){
			$('.default-image').hide();
			$('.current-image').show();
			
			var titleValue = $(this).text();
			var contentValue = $(this).next("p").text();
			
			var Feedurl = $(this).parents('.rssRow').find('.rss-feed-image-link').text();
	var query = 'select * from html where url="' + Feedurl + '" and xpath="*"';
	var url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query);

	$.get(url, function(data) {
		var html = $(data).find('html');
		var metaImg = html.find('meta[property="og:image"]').attr("content") || 'no image found';
		
		$('#image-1 img').attr('src', metaImg);
	});		
			
			$("#title-1").text(titleValue);
			$("#subtitle-1").text(contentValue);
			
		});			
	}

	function _formatFilesize(bytes) {
		var s = [
			"bytes",
			"kb",
			"MB",
			"GB",
			"TB",
			"PB"
		];
		var e = Math.floor(Math.log(bytes) / Math.log(1024));

		return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
	}

 function _formatDate(date, mask) {
		var fmtDate = new Date(date);

		date = mask;

		date = date.replace("dd", _formatDigit(fmtDate.getDate()));
		date = date.replace("MMMM", _getMonthName(fmtDate.getMonth()));
		date = date.replace("MM", _formatDigit(fmtDate.getMonth()+1));
		date = date.replace("yyyy",fmtDate.getFullYear());
		date = date.replace("hh", _formatDigit(fmtDate.getHours()));
		date = date.replace("mm", _formatDigit(fmtDate.getMinutes()));
		date = date.replace("ss", _formatDigit(fmtDate.getSeconds()));

		return date;
	}

	function _formatDigit(digit) {
		digit += "";

		if (digit.length < 2) {
			digit = "0" + digit;
		}

		return digit;
	}

	function _getMonthName(month) {
		var name = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];

		return name[month];
	}

	function _getXMLDocument(str) {
		var browser = navigator.appName;
		var xml;

		if (browser == "Microsoft Internet Explorer") {
			xml = new ActiveXObject("Microsoft.XMLDOM");
			xml.async = false;
			xml.loadXML(str);
		} else {
			xml = (new DOMParser()).parseFromString(str, "text/xml");
		}

		return xml;
	}

	function _getLapsedTime(date) {
		var todayDate = new Date();
		var pastDate = new Date(date);
		var lapsedTime = Math.round((todayDate.getTime() - pastDate.getTime()) / 1000)

		if (lapsedTime < 60) {
			return "< 1 min";
		} else if (lapsedTime < (60 * 60)) {
			var t = Math.round(lapsedTime / 60) - 1;
			var u = "min";
		} else if (lapsedTime < (24 * 60 * 60)) {
			var t = Math.round(lapsedTime / 3600) - 1;
			var u = "hour";
		} else if (lapsedTime < (7 * 24 * 60 * 60)) {
			var t = Math.round(lapsedTime / 86400) - 1;
			var u = "day";
		} else {
			var t = Math.round(lapsedTime / 604800) - 1;
			var u = "week";
		}

		if (t > 1) {
			u += "s";
		}

		return t + " " + u;
	}
})(jQuery);
