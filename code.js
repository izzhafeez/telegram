var token = TOKEN1;
var telegramUrl = "https://api.telegram.org/bot" + token;

var ssId = TOKEN2;
var webAppUrl = "https://script.google.com/macros/s/AKfycbxYJogLuNHluOSbgPeXHb6tuFH9FVEfYspurA1MWRCTjBUn05pKYa9OM-5_akiBuNDw/exec";

function sendText(id, text) {
  var response = UrlFetchApp.fetch(telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text + "&parse_mode=html");
}

function tri() {
  sendText("242141394", "hello");
}

function tri2() {
  var searcher = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");
  var resultsRange = searcher.getRange("A3").getDataRegion().getValues();
  Logger.log(resultsRange);
  for (i in resultsRange) {
      var result = resultsRange[i];
      if (result[4] != "") {
        var important = "**";
      } else {
        var important = ""
      }
      var toSend = encodeURIComponent(result[0] + ": " + result[1] + important + "\n" + "\n" + clean(result[2]));
      sendText("242141394", toSend);
    }
}

function tri3() {
  var searcher = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");
  if (searcher.getRange("B3").getValue() == "") {
    sendText("242141394", encodeURI("<b>Not found</b>, try again"));
  }
}

function getUpdates() {
  var url = telegramUrl + "/getUpdates";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(webAppUrl);
  Logger.log(response.getContentText());
}

function deleteWebhook() {
  var url = telegramUrl + "/deleteWebhook";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hello there");
}

function clean(text) {
  return text.replace(/&/g,"&amp;").replace(/#/g,"&num;").replace(/\?> /g,"/").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&lt;JV/g,"<pre language=\"java\">").replace(/JV&gt;/g,"</pre>").replace(/&lt;MA/g,"<code>").replace(/MA&gt;/g,"</code>");
}

function unclean(text) {
  // return text.replace("%26", "&").replace("%2B", "+").replace("%23", "#");
  return text;
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var searcher = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");

  searcher.getRange("A1").setValue(text);
  // searcher.getRange("A2").setValue(id);
  if (searcher.getRange("B3").getValue() == "") {
    sendText(id, "Not found, try again");
  }
  var resultsRange = searcher.getRange("A3").getDataRegion().getValues();
  Logger.log(resultsRange);
  
  for (i in resultsRange) {
      var result = resultsRange[i];
      if (result[4] != "") {
        var important = "**";
      } else {
        var important = ""
      }
      var toSend = encodeURIComponent("<b>" + clean(result[0]) + "</b>: " + clean(result[1]) + important + "\n" + "\n" + clean(result[2]));
      sendText(id,toSend);
    }
}
