# Smart Stock Viewer

Smart component that uses YQL to query MSN.com Money.

Initialise a new js object and pass in the following required values:

# Parameters
* **elem** : a jquery selector which targets the container you want to fill with the stock data
* **symbol** : the stock symbol representing the stock you want to display, e.g. GOOG, APPL
* **title** : the text you want to display at the top of the stock display to indicate the name of the stock
	
## Installation
Download this repository and extract it to:

	/intranet/components/smart-stock/
	
### Styles
The styles for the stock component are stored in a stylesheet which is loaded via javascript. This stylsheet can be found at:

	intranet/components/css/styles.css

## Example

Copy the following html into your page. 

	<script src="/intranet/components/smart-stock/js/stock.js"></script>
	<script>
	new Stock("#stockGoog", "GOOG", "Google");
	new Stock("#stockAppl", "AAPL", "Apple ");
	</script>

	<div id="stockGoog" class="stock-ticker"></div>
	<div id="stockAppl" class="stock-ticker"></div>