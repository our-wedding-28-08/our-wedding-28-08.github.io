window.BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
      } else if (dataProp) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {string: navigator.userAgent, subString: "OPR", identity: "OPR"},
    {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
    {string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"},
    {string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version"},
    {prop: window.opera, identity: "Opera", versionSearch: "Version"},
    {string: navigator.vendor, subString: "iCab", identity: "iCab"},
    {string: navigator.vendor, subString: "KDE", identity: "Konqueror"},
    {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
    {string: navigator.vendor, subString: "Camino", identity: "Camino"},
    {/* For Newer Netscapes (6+) */ string: navigator.userAgent, subString: "Netscape", identity: "Netscape"},
    {string: navigator.userAgent, subString: "MSIE", identity: "Internet Explorer", versionSearch: "MSIE"},
    {string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"},
    {/* For Older Netscapes (4-) */ string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"}
  ],
  dataOS : [
    {string: navigator.platform, subString: "Win", identity: "Windows"},
    {string: navigator.platform, subString: "Mac", identity: "Mac"},
    {string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod"},
    {string: navigator.platform, subString: "Linux", identity: "Linux"}
  ]
};

BrowserDetect.init();

if (
  (BrowserDetect.browser === "Chrome" && BrowserDetect.version < 72) ||
  (BrowserDetect.browser === "Firefox" && BrowserDetect.version < 72) ||
  (BrowserDetect.browser === "OPR" && BrowserDetect.version < 72) ||
  (BrowserDetect.browser === "Safari" && BrowserDetect.version < 14) ||
  navigator.userAgent.search("Trident") >= 0
) {
  location.href = 'not-support.html';
}
