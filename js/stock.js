// Stock Tool
// Note: Uses Yahoo Query Language to pull data from MSN.com via Yahoo's Developer network tool

// URL TO YQL CONSOLE
// https://developer.yahoo.com/yql/console/?q=select%20*%20from%20stocks.finance.yahoo.co.jp#h=select+*+from+html+where+url%3D%22http%3A%2F%2Fwww.msn.com%2Fen-gb%2Fmoney%2Fstockdetails%3Fsymbol%3DJP%3A7867%22+and%0A++++++xpath%3D'%2F%2Fdiv%5B%40id%3D%22live-quote%22%5D%2Fdiv%5B1%5D%2Fdiv%5B2%5D'

var Stock = function(elem, symbol, title) {
	this.elem = elem;
	this.symbol = symbol;
	this.title = title;

	this.query();
};

Stock.prototype.query = function( symbol ) {
	var url = "http://www.msn.com/en-gb/money/stockdetails?symbol=" + this.symbol,
	xpath = '//div[@id=\"live-quote\"]/div[1]/div[2]',
	query = "select * from html where url=\"{0}\" and xpath='{1}'".replace("{0}", url).replace("{1}", xpath),
	yahoo = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent( query ) + "&format=json&diagnostics=true&callback=";

	this.source = url;
	this.attachStyle();

	this.getData( yahoo );
}

Stock.prototype.attachStyle = function(){
	var link = document.createElement( "link" );
	link.href = "/intranet/components/smart-stock/css/style.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	link.media = "screen,print";

	document.getElementsByTagName( "head" )[0].appendChild( link );
}

Stock.prototype.getData = function(query) {
	var _this = this;

	jQuery.ajax({
		url : query,
		success : function(data) {
			if( !data.query.results ) {
				_this.error( 'Unable to find the stock symbol "' + _this.symbol +'".' );
				return false;
			}

			_this.template( data.query.results );
		}
	});
}

Stock.prototype.render = function( template ) {
	jQuery( this.elem ).html( template ).removeClass('stock-loader');
}

Stock.prototype.error = function( msg ) {
	var err = '<div class="alert alert-error">' + msg + '</div>';
	this.render( err );
}

Stock.prototype.template = function( results ) {
	var img = results.div.div[0].span,
		val = results.div.div[1].span,
		change_val = results.div.div[2].div[0],
		change_per = results.div.div[2].div[1],
		template =  '<a href="{8}" class="stock-ticker"><div class="stock-name">{7}</div> <div class="stock-direction {4}">{0}</div> <div class="stock-amount {5}">{2}</div> <div class="stock-amount {6}">{3}</div> <div class="stock-val">{1}</div></a>'
			.replace("{0}", img.content)
			.replace("{1}", val.content)
			.replace("{2}", change_val.p)
			.replace("{3}", change_per.p)
			.replace("{4}", img.class)
			.replace("{5}", change_per.class)
			.replace("{6}", change_per.class)
			.replace("{7}", this.title)
			.replace("{8}", this.source);

	this.render( template );
}
