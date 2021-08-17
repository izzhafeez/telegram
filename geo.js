var token = "TOKEN1";
var telegramUrl = "https://api.telegram.org/bot" + token;

var ssId = "TOKEN2";
var webAppUrl= "https://script.google.com/macros/s/AKfycbwufUePH_GXDfGRY7opbqV4FCP_hapty8DBzpkBqrS_kqgw_9IHClpXAuIIjNwZPC8O/exec"

function sendText(id, text) {
  var response = UrlFetchApp.fetch(telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text);
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

function doPost(e) {
  // this is where telegram works
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var datetime = data.message.date;

  var halalSheet = SpreadsheetApp.openById(ssId).getSheetByName("Halal");
  var ids = halalSheet.getRange("A:A").getValues().slice(1,).flat();

  var searcherSheet = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");
  var searcher = searcherSheet.getRange("A1").getDataRegion().getValues().slice(1,);

  var firstCol = SpreadsheetApp.openById(ssId).getSheetByName("Searcher").getRange("A:A").getValues().slice(1,).flat();

  if (!firstCol.includes(id)) {
    searcherSheet.appendRow([id,"","Orchard","Food",
    "=IFERROR(ARRAY_CONSTRAIN(SORT(FILTER(MRT!E:E,REGEXMATCH(LOWER(MRT!B:B),LOWER(C" + String(searcher.length + 2) + "))),8,TRUE),1,1),ARRAY_CONSTRAIN(FILTER('Malls Raw'!C:C,REGEXMATCH(LOWER('Malls Raw'!A:A),LOWER(C" + String(searcher.length + 2) + "))),1,1))",
    "=IFERROR(ARRAY_CONSTRAIN(SORT(FILTER(MRT!F:F,REGEXMATCH(LOWER(MRT!B:B),LOWER(C" + String(searcher.length + 2) + "))),8,TRUE),1,1),ARRAY_CONSTRAIN(FILTER('Malls Raw'!D:D,REGEXMATCH(LOWER('Malls Raw'!A:A),LOWER(C" + String(searcher.length + 2) + "))),1,1))",
    datetime]);
  }

  var searcherSheet = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");
  var searcher = searcherSheet.getRange("A1").getDataRegion().getValues().slice(1,);

  var firstCol = SpreadsheetApp.openById(ssId).getSheetByName("Searcher").getRange("A:A").getValues().slice(1,).flat();
  
  var idIndex = parseInt(firstCol.indexOf(id) + 2);
  
  searcherSheet.getRange("G" + String(idIndex)).setValue(datetime);

  if (text[0] == "/") {
    searcherSheet.getRange("B" + String(idIndex)).setValue(text);
  }

  if (text == "/setlocation") {
    sendText(id,"Please input location name. Names of MRT stations or Malls are preferred.");
  } else if (text == "/setfood") {
    sendText(id,"Please input your food preferences. Separate them using commas.");
  } else if (text == "/getparams") {
    var toSend = "Location: " + searcher[idIndex-2][2] + "%0AFood: " + searcher[idIndex-2][3];
    sendText(id,toSend);
  } else if (text == "/imhungry") {
    var resultsRange = SpreadsheetApp.openById(ssId).getSheetByName("Results").getRange("A3").getDataRegion().getValues();

    for (i in resultsRange) {
        var result = resultsRange[i];
        var toSend = result[0].replace("&","and") + "%0A" +
        result[1] + "%0A" +
        String(result[11] * 1000).slice(0,6) + "m";
        sendText(id,toSend);
      }

    if (resultsRange.length == 0) {
      sendText(id,"Something went wrong. Use /getparams to see what you entered.")
    }

  } else {
    if (searcher[idIndex-2][1] == "/setlocation") {
      searcherSheet.getRange("C" + String(idIndex)).setValue(text);
      if (SpreadsheetApp.openById(ssId).getSheetByName("Searcher").getRange("E" + String(idIndex)).getValues()[0][0] == "#N/A") {
        sendText(id,"Location not found. Please try again.");
      } else {
        sendText(id,"Location set successfully.")
      }
    } else if (searcher[idIndex-2][1] == "/setfood") {
      var textSplit = text.split(",");
      var formatted = "(";
      try {
        for (i in textSplit) {
          if (i == 0) {
            formatted += textSplit[i].trim();
          } else {
            formatted += "|" + textSplit[i].trim();
          }
        }
        formatted += ")";
      } catch(e) {
        formatted += ")";
      }
      searcherSheet.getRange("D" + String(idIndex)).setValue(formatted);
      sendText(id,"Food preference set successfully.");
    }
  }
}

function testing() {

  var id = 103;
  var text = "chinese, malay, italian";

  var textSplit = text.split(",");
  var formatted = "(";
  try {
    for (i in textSplit) {
      if (i == 0) {
        formatted += textSplit[i].trim();
      } else {
        formatted += "|" + textSplit[i].trim();
      }
    }
    formatted += ")";
  } catch(e) {
    formatted += ")";
  }
  
  Logger.log(formatted)

  var datetime=new Date;
  Logger.log(datetime)

  var halalSheet = SpreadsheetApp.openById(ssId).getSheetByName("Halal");
  var ids = halalSheet.getRange("A:A").getValues().slice(1,).flat();

  var searcherSheet = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");
  var searcher = searcherSheet.getRange("A1").getDataRegion().getValues().slice(1,);

  var firstCol = SpreadsheetApp.openById(ssId).getSheetByName("Searcher").getRange("A:A").getValues().slice(1,).flat();

  if (!firstCol.includes(id)) {
    searcherSheet.appendRow([id,"","Orchard","Food",
    "=IFERROR(ARRAY_CONSTRAIN(FILTER(MRT!E:E,REGEXMATCH(LOWER(MRT!B:B),LOWER(C" + String(searcher.length + 2) + "))),1,1),ARRAY_CONSTRAIN(FILTER('Malls Raw'!C:D,REGEXMATCH(LOWER('Malls Raw'!A:A),LOWER(C" + String(searcher.length + 2) + "))),1,1))",
    "=IFERROR(ARRAY_CONSTRAIN(FILTER(MRT!F:F,REGEXMATCH(LOWER(MRT!B:B),LOWER(C" + String(searcher.length + 2) + "))),1,1),ARRAY_CONSTRAIN(FILTER('Malls Raw'!C:D,REGEXMATCH(LOWER('Malls Raw'!A:A),LOWER(C" + String(searcher.length + 2) + "))),1,1))",
    datetime]);
  }

  var searcherSheet = SpreadsheetApp.openById(ssId).getSheetByName("Searcher");
  var searcher = searcherSheet.getRange("A1").getDataRegion().getValues().slice(1,);

  var firstCol = SpreadsheetApp.openById(ssId).getSheetByName("Searcher").getRange("A:A").getValues().slice(1,).flat();
  
  var idIndex = parseInt(firstCol.indexOf(id) + 2);
  Logger.log(idIndex);
  searcherSheet.getRange("G" + String(idIndex)).setValue(datetime);

  if (text[0] == "/") {
    searcherSheet.getRange("B" + String(idIndex)).setValue(text);
  }

  if (text == "/setlocation") {
    Logger.log("Please input location name. Names of MRT stations or Malls are preferred.");
  } else if (text == "/setfood") {
    Logger.log("Please input food. Separate food using commas.");
  } else if (text == "/getparams") {
    Logger.log("Location: " + searcher[idIndex-2][2] + "\nFood: " + searcher[idIndex-2][3]);
  } else if (text == "/imhungry") {
    var resultsRange = SpreadsheetApp.openById(ssId).getSheetByName("Results").getRange("A3").getDataRegion().getValues();

    for (i in resultsRange) {
      var result = resultsRange[i];
      Logger.log(result[0] + "\n" +
      result[1] + " " +
      result[2] + "\n" +
      String(result[11] * 1000).slice(0,3) + "m");
    }
  } else {
    if (searcher[idIndex-2][1] == "/setlocation") {
      searcherSheet.getRange("C" + String(idIndex)).setValue(text);
    } else if (searcher[idIndex-2][1] == "/setfood") {
      searcherSheet.getRange("D" + String(idIndex)).setValue(text);
    }
  }
  Logger.log(SpreadsheetApp.openById(ssId).getSheetByName("Searcher").getRange("E" + String(idIndex)).getValues()[0][0] == "#N/A");



}