var token2 = "1278093075:AAFleWJaZtxylodTaXpDI5v5juL5jYpfXKY";
var token = "1780116415:AAGYOo142ppvq8PDpa2v-YEnGVytNzY-jZk";
var confucius = "1680497917:AAFR4YjRek_s5cHJou8ZvZeL1A-SV2YxwPE";
var url = "https://api.telegram.org/bot" + token;

var chatId = 242141394;
var ssId = "1m9J0FYZtODqZkeSm_5zAvVQC3Lgj3s5FaFN_AzU8hFA";
var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
var hsk = SpreadsheetApp.openById(ssId).getSheetByName('HSK');
var idioms = SpreadsheetApp.openById(ssId).getSheetByName('Idioms');
var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
var french = SpreadsheetApp.openById(ssId).getSheetByName('French');
var randomiserSheet = SpreadsheetApp.openById(ssId).getSheetByName('Randomiser');

var keyBoard = {
  "inline_keyboard": [
    [{
      "text": "Budget",
      "callback_data": "budget"
    }],
    [{
      "text": "Expenses",
      "callback_data": "expenses"
    }],
    [{
      "text": "Savings",
      "callback_data": "savings"
    }]
  ]
}

function sendText(text) {
  var response = UrlFetchApp.fetch(url + "/sendMessage?chat_id=" + chatId + "&text=" + text);
}

function sendFormatted() {
  var response = UrlFetchApp.fetch(url + "/sendMessage?chat_id=" + chatId + "&text=" + "Hello there&parse_mode=__Hi__");
}

function sendMessage(text,keyBoard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: "242141394",
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard)
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
}

function sendStuff() {
  return sendMessage("Like that", keyBoard);
}

function weihaoText(text) {
  var response = UrlFetchApp.fetch(url + "/sendMessage?chat_id=199555163&text=" + text);
}

function zitongText(text) {
  var response = UrlFetchApp.fetch(url + "/sendMessage?chat_id=1258724328&text=" + text);
}

function datetime() {
  timeNow = new Date;
  var timenow = parseInt(timeNow.toString()[8] + timeNow.toString()[9]) == 28;
  Logger.log(timenow);
}

function vocab() {
  
  timeNow = new Date;
  var hourNow = parseInt(timeNow.toString()[16] + timeNow.toString()[17])
  Logger.log(timeNow.toString());
  Logger.log(hourNow);
  
  chineseRandomiserRange = randomiserSheet.getRange(2, 1, chinese.getMaxRows() - 1, 1).randomize();
  chineseRandomNumber = chineseRandomiserRange.getValues()[0][0];
  Logger.log(chineseRandomNumber);
  
  word = chinese.getRange(2 + chineseRandomNumber, 1, 1, 8).getValues()[0];
  mainWord = word[0];
  try{pinyin = ' ' + word[2];} catch(e) {pinyin = '';}
  try{purpose = '%0AP: ' + word[3];} catch(e) {purpose = '';}
  try{usage = '%0AM: ' + word[4];} catch(e) {usage = '';}
  //try{example = '%0AS: ' + word[5];} catch(e) {example = '';}
  //try{examplePinyin = '%0AP: ' + word[6];} catch(e) {examplePinyin = '';}
  //try{translation = '%0AT: ' + word[7];} catch(e) {translation = '';}
  
  Logger.log(word);
  
  if ((hourNow < 23) & (hourNow > 5)) {
    text = mainWord + pinyin + purpose + usage;
    sendText(text);
  }
  
  japaneseRandomiserRange = randomiserSheet.getRange(2, 2, japanese.getMaxRows() - 1, 1).randomize();
  japaneseRandomNumber = japaneseRandomiserRange.getValues()[0][0];
  Logger.log(japaneseRandomNumber);
  word = japanese.getRange(2 + japaneseRandomNumber, 1, 1, 10).getValues()[0];
  mainWord = word[0];
  try{romaji = ' ' + word[1];} catch(e) {romaji = '';}
  try{purpose = '%0AP: ' + word[3];} catch(e) {purpose = '';}
  try{usage = '%0AM: ' + word[4];} catch(e) {usage = '';}
  try{example = '%0AS: ' + word[5];} catch(e) {example = '';}
  try{exampleRomaji = '%0AR: ' + word[6];} catch(e) {exampleRomaji = '';}
  try{translation = '%0AT: ' + word[7];} catch(e) {translation = '';}
  try{link = '%0AL: ' + word[9];} catch(e) {link = '';}
  Logger.log(word);
  
  if ((hourNow < 23) & (hourNow > 5)) {
    text = mainWord + romaji + purpose + usage + example + exampleRomaji + translation + link;
    sendText(text);  
  }
  
  koreanRandomiserRange = randomiserSheet.getRange(2, 3, korean.getMaxRows() - 1, 1).randomize();
  koreanRandomNumber = koreanRandomiserRange.getValues()[0][0];
  Logger.log(koreanRandomNumber);
  word = korean.getRange(2 + koreanRandomNumber, 1, 1, 10).getValues()[0];
  mainWord = word[0];
  try{romanized = ' ' + word[1];} catch(e) {romanized = '';}
  try{chinese = '%0AH: ' + word[2];} catch(e) {chinese = '';}
  try{pinyin = ' ' + word[3];} catch(e) {pinyin = '';}
  try{usage = '%0AM: ' + word[5];} catch(e) {usage = '';}
  try{example = '%0AS: ' + word[6];} catch(e) {example = '';}
  try{translation = '%0AT: ' + word[7];} catch(e) {translation = '';}
  try{link = '%0AL: ' + word[9];} catch(e) {link = '';}
  Logger.log(word);
  
  if ((hourNow < 23) & (hourNow > 5)) {
    text = mainWord + romanized + chinese + pinyin + usage + example + translation + link;
    sendText(text);
  }
  
  hskRandomiserRange = randomiserSheet.getRange(2, 4, hsk.getMaxRows() - 1, 1).randomize();
  hskRandomNumber = hskRandomiserRange.getValues()[0][0];
  Logger.log(hskRandomNumber);
  
  word = hsk.getRange(2 + hskRandomNumber, 1, 1, 9).getValues()[0];
  mainWord = word[0];
  try{pinyin = ' ' + word[2];} catch(e) {pinyin = '';}
  try{purpose = '%0AP: ' + word[3];} catch(e) {purpose = '';}
  try{usage = '%0AM: ' + word[4];} catch(e) {usage = '';}
  try{example = '%0AS: ' + word[5];} catch(e) {example = '';}
  try{examplePinyin = '%0AP: ' + word[6];} catch(e) {examplePinyin = '';}
  try{translation = '%0AT: ' + word[7];} catch(e) {translation = '';}
  try{level = '%0AL: ' + word[8];} catch(e) {level = '';}
  
  Logger.log(word);
  
  if ((hourNow < 23) & (hourNow > 5)) {
    text = mainWord + pinyin + purpose + usage + example + examplePinyin + translation + level;
    sendText(text);
  }
  
}

function weihaoVocab() {
  randomiserRange = randomiserSheet.getRange(2, 2, japanese.getMaxRows() - 1, 1).randomize();
  randomNumber = randomiserRange.getValues()[0][0];
  word = japanese.getRange(2 + randomNumber, 1, 1, 10).getValues()[0];
  mainWord = word[0];
  try{romaji = ' ' + word[1];} catch(e) {romaji = '';}
  try{purpose = '%0AP: ' + word[3];} catch(e) {purpose = '';}
  try{usage = '%0AM: ' + word[4];} catch(e) {usage = '';}
  try{example = '%0AS: ' + word[5];} catch(e) {example = '';}
  try{exampleRomaji = '%0AR: ' + word[6];} catch(e) {exampleRomaji = '';}
  try{translation = '%0AT: ' + word[7];} catch(e) {translation = '';}
  try{link = '%0AL: ' + word[9];} catch(e) {link = '';}
  Logger.log(word);
  timeNow = new Date;
  var hourNow = parseInt(timeNow.toString()[16] + timeNow.toString()[17])
  Logger.log(timeNow.toString());
  Logger.log(hourNow);
  if ((hourNow < 18) & (hourNow > 7)) {
    text = mainWord + romaji + purpose + usage + example + exampleRomaji + translation + link;
    weihaoText(text);
  }
}

function zitongVocab() {
  randomiserRange = randomiserSheet.getRange(2, 2, japanese.getMaxRows() - 1, 1).randomize();
  randomNumber = randomiserRange.getValues()[0][0];
  word = japanese.getRange(2 + randomNumber, 1, 1, 10).getValues()[0];
  mainWord = word[0];
  try{romaji = ' ' + word[1];} catch(e) {romaji = '';}
  try{purpose = '%0AP: ' + word[3];} catch(e) {purpose = '';}
  try{usage = '%0AM: ' + word[4];} catch(e) {usage = '';}
  try{example = '%0AS: ' + word[5];} catch(e) {example = '';}
  try{exampleRomaji = '%0AR: ' + word[6];} catch(e) {exampleRomaji = '';}
  try{translation = '%0AT: ' + word[7];} catch(e) {translation = '';}
  try{link = '%0AL: ' + word[9];} catch(e) {link = '';}
  Logger.log(word);
  timeNow = new Date;
  var hourNow = parseInt(timeNow.toString()[16] + timeNow.toString()[17])
  Logger.log(timeNow.toString());
  Logger.log(hourNow);
  if ((hourNow < 18) & (hourNow > 7)) {
    text = mainWord + romaji + purpose + usage + example + exampleRomaji + translation + link;
    zitongText(text);
  }
}

var chineseToken = "1391962524:AAHH_lOUK8UCXFlUf4HE7LGop1MxjO9-NEw";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbwAVzO1zXT6KzH_AxHC8XMezcT3X12JvqQ-Sp7pNYAtdu-VcLP4B7EHBp218GFw2zPk/exec";

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function deleteWebhook() {
  var url = telegramUrl + "/deleteWebhook";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

//function sendText2(id,text) {
//  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
//  var response = UrlFetchApp.fetch(url);
//  Logger.log(response.getContentText());
//}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hello there");
}

function doPost(e) {
  // this is where telegram works
  sendText("Yes");
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  Logger.log(text);
  var categories = text.split("  ");
  var language = categories[0];
  var word = categories[1];
  var meanings = categories[2];
  
  if(language == "C") {
    var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
    chinese.appendRow([word,"","","",meanings,"","","",""]);
    sendText("Chinese: " + word + " dones!");
  }

  if(language == "J") {
    var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
    try{var romaji = categories[3];} catch(e) {var romaji = '';}
    japanese.appendRow([word,meanings,"","",romaji,"","","","",""]);
    sendText("Japanese: " + word + " done!");
  }

  if(language == "K") {
    var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
    korean.appendRow([word,"","","",meanings,"","","",""]);
    sendText("Korean: " + word + " done!");
  }
}

function sendDay() {
  
  timeNow = new Date;
  var dayOfWeek = timeNow.toString()[0];
  var dayOfMonth = parseInt(timeNow.toString()[8] + timeNow.toString()[9]);
  var randomiser = SpreadsheetApp.openById(ssId).getSheetByName('Randomiser');
  var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
  var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
  var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
  
  var minus1c = randomiser.getRange("B5").getValues()[0][0];
  var minus2c = randomiser.getRange("B6").getValues()[0][0];
  var minus3c = randomiser.getRange("B7").getValues()[0][0];
  var minus4c = randomiser.getRange("B8").getValues()[0][0];
  var minus5c = randomiser.getRange("B9").getValues()[0][0];
  var minus6c = randomiser.getRange("B10").getValues()[0][0];
  var minus7c = randomiser.getRange("B11").getValues()[0][0];
  
  var minus1j = randomiser.getRange("C5").getValues()[0][0];
  var minus2j = randomiser.getRange("C6").getValues()[0][0];
  var minus3j = randomiser.getRange("C7").getValues()[0][0];
  var minus4j = randomiser.getRange("C8").getValues()[0][0];
  var minus5j = randomiser.getRange("C9").getValues()[0][0];
  var minus6j = randomiser.getRange("C10").getValues()[0][0];
  var minus7j = randomiser.getRange("C11").getValues()[0][0];
  
  var minus1k = randomiser.getRange("D5").getValues()[0][0];
  var minus2k = randomiser.getRange("D6").getValues()[0][0];
  var minus3k = randomiser.getRange("D7").getValues()[0][0];
  var minus4k = randomiser.getRange("D8").getValues()[0][0];
  var minus5k = randomiser.getRange("D9").getValues()[0][0];
  var minus6k = randomiser.getRange("D10").getValues()[0][0];
  var minus7k = randomiser.getRange("D11").getValues()[0][0];
  
  randomiser.getRange("B11").setValue(minus6c);
  randomiser.getRange("B10").setValue(minus5c);
  randomiser.getRange("B9").setValue(minus4c);
  randomiser.getRange("B8").setValue(minus3c);
  randomiser.getRange("B7").setValue(minus2c);
  randomiser.getRange("B6").setValue(minus1c);
  randomiser.getRange("B5").setValue(chinese.getRange("A1").getDataRegion().getNumRows());
  
  randomiser.getRange("C11").setValue(minus6j);
  randomiser.getRange("C10").setValue(minus5j);
  randomiser.getRange("C9").setValue(minus4j);
  randomiser.getRange("C8").setValue(minus3j);
  randomiser.getRange("C7").setValue(minus2j);
  randomiser.getRange("C6").setValue(minus1j);
  randomiser.getRange("C5").setValue(japanese.getRange("A1").getDataRegion().getNumRows());
  
  randomiser.getRange("D11").setValue(minus6k);
  randomiser.getRange("D10").setValue(minus5k);
  randomiser.getRange("D9").setValue(minus4k);
  randomiser.getRange("D8").setValue(minus3k);
  randomiser.getRange("D7").setValue(minus2k);
  randomiser.getRange("D6").setValue(minus1k);
  randomiser.getRange("D5").setValue(korean.getRange("A1").getDataRegion().getNumRows());
  
  if ((dayOfWeek !== "M") & (dayOfMonth !== 1)) {
    
    sendText("Day Report:");
    
    var randomiser = SpreadsheetApp.openById(ssId).getSheetByName('Randomiser');
    var dayChinese = randomiser.getRange("B2").getValues()[0][0];
    var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
    var range = chinese.getRange(dayChinese,1,chinese.getMaxRows() - dayChinese + 1,9).getValues();
    //var totalChinese = "";
    for (var i = 0; i < chinese.getMaxRows() - dayChinese + 1; i++) {
      var row = range[i];
      mainWord = row[0];
      if (!mainWord == ""){ 
        try{pinyin = ' ' + row[2];} catch(e) {pinyin = '';}
        try{usage = ': ' + row[4];} catch(e) {usage = '';}
        text = mainWord + pinyin + usage;
        //totalChinese = totalChinese + "%0A" + text;
        try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
      } else {
        randomiser.getRange("B2").setValue(i + dayChinese);
        break;
      }
    }
    //try{sendText(totalChinese)} catch(e) {sendText("Day Chinese cannot")};
    
    var dayJapanese = randomiser.getRange("C2").getValues()[0][0];
    var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
    var range = japanese.getRange(dayJapanese,1,japanese.getMaxRows() - dayJapanese + 1,9).getValues();
    //var totalJapanese = "";
    for (var i = 0; i < japanese.getMaxRows() - dayJapanese + 1; i++) {
      var row = range[i];
      mainWord = row[0];
      if (!mainWord == ""){
        try{romaji = ' ' + row[1];} catch(e) {romaji = '';}
        try{usage = ': ' + row[4];} catch(e) {usage = '';}
        text = mainWord + romaji + usage;
        //totalJapanese = totalJapanese + "%0A" + text;
        try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
      } else {
        randomiser.getRange("C2").setValue(i + dayJapanese);
        break;
      }
    }
    //try{sendText(totalJapanese)} catch(e) {sendText("Day Japanese cannot")};
    
    var dayKorean = randomiser.getRange("D2").getValues()[0][0];
    var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
    var range = korean.getRange(dayKorean,1,korean.getMaxRows() - dayKorean + 1,9).getValues();
    //var totalKorean = "";
    for (var i = 0; i < korean.getMaxRows() - dayKorean + 1; i++) {
      var row = range[i];
      mainWord = row[0];
      if (!mainWord == ""){
        try{romanized = ' ' + row[1];} catch(e) {romanized = '';}
        try{usage = ': ' + row[5];} catch(e) {usage = '';}
        text = mainWord + romanized + usage;
        //totalKorean = totalKorean + "%0A" + text;
        try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
      } else {
        randomiser.getRange("D2").setValue(i + dayKorean);
        break;
      }
    }
    //try{sendText(totalKorean)} catch(e) {sendText("Day Korean cannot")};
  }
}

function sendWeek() {
  
  timeNow = new Date;
  var dayOfMonth = parseInt(timeNow.toString()[8] + timeNow.toString()[9]);
  
  if (dayOfMonth !== 1) {
    
    sendText("Week Report:");
    
    var randomiser = SpreadsheetApp.openById(ssId).getSheetByName('Randomiser');
    var weekChinese = randomiser.getRange("B3").getValues()[0][0];
    var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
    var range = chinese.getRange(weekChinese,1,chinese.getMaxRows() - weekChinese + 1,9).getValues();
    //var totalChinese = "";
    for (var i = 0; i < chinese.getMaxRows() - weekChinese + 1; i++) {
      var row = range[i];
      mainWord = row[0];
      if (!mainWord == ""){ 
        try{pinyin = ' ' + row[2];} catch(e) {pinyin = '';}
        try{usage = ': ' + row[4];} catch(e) {usage = '';}
        text = mainWord + pinyin + usage;
        //totalChinese = totalChinese + "%0A" + text;
        try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
      } else {
        randomiser.getRange("B3").setValue(i + weekChinese);
        break;
      }
    }
    //try{sendText(totalChinese)} catch(e) {sendText("Week Chinese cannot")};
    
    var weekJapanese = randomiser.getRange("C3").getValues()[0][0];
    var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
    var range = japanese.getRange(weekJapanese,1,japanese.getMaxRows() - weekJapanese + 1,9).getValues();
    //var totalJapanese = "";
    for (var i = 0; i < japanese.getMaxRows() - weekJapanese + 1; i++) {
      var row = range[i];
      mainWord = row[0];
      if (!mainWord == ""){
        try{romaji = ' ' + row[1];} catch(e) {romaji = '';}
        try{usage = ': ' + row[4];} catch(e) {usage = '';}
        text = mainWord + romaji + usage;
        //totalJapanese = totalJapanese + "%0A" + text;
        try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
      } else {
        randomiser.getRange("C3").setValue(i + weekJapanese);
        break;
      }
    }
    //try{sendText(totalJapanese)} catch(e) {sendText("Week Japanese cannot")};
    
    var weekKorean = randomiser.getRange("D3").getValues()[0][0];
    var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
    var range = korean.getRange(weekKorean,1,korean.getMaxRows() - weekKorean + 1,9).getValues();
    //var totalKorean = "";
    for (var i = 0; i < korean.getMaxRows() - weekKorean + 1; i++) {
      var row = range[i];
      mainWord = row[0];
      if (!mainWord == ""){
        try{romanized = ' ' + row[1];} catch(e) {romanized = '';}
        try{usage = ': ' + row[5];} catch(e) {usage = '';}
        text = mainWord + romanized + usage;
        //totalKorean = totalKorean + "%0A" + text;
        try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
      } else {
        randomiser.getRange("D3").setValue(i + weekKorean);
        break;
      }
    }
    //try{sendText(totalKorean)} catch(e) {sendText("Week Korean cannot")};
  }
}

function sendMonth() {
  
  sendText("Month Report:");
  
  var randomiser = SpreadsheetApp.openById(ssId).getSheetByName('Randomiser');
  var monthChinese = randomiser.getRange("B4").getValues()[0][0];
  var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
  var range = chinese.getRange(monthChinese,1,chinese.getMaxRows() - monthChinese + 1,9).getValues();
  //var totalChinese = "";
  for (var i = 0; i < chinese.getMaxRows() - monthChinese + 1; i++) {
    var row = range[i];
    mainWord = row[0];
    if (!mainWord == ""){ 
      try{pinyin = ' ' + row[2];} catch(e) {pinyin = '';}
      try{usage = ': ' + row[4];} catch(e) {usage = '';}
      text = mainWord + pinyin + usage;
      //totalChinese = totalChinese + "%0A" + text;
      try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
    } else {
      randomiser.getRange("B4").setValue(i + monthChinese);
      break;
    }
  }
  //try{sendText(totalChinese)} catch(e) {sendText("Month Chinese cannot")};
  
  var monthJapanese = randomiser.getRange("C4").getValues()[0][0];
  var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
  var range = japanese.getRange(monthJapanese,1,japanese.getMaxRows() - monthJapanese + 1,9).getValues();
  //var totalJapanese = "";
  for (var i = 0; i < japanese.getMaxRows() - monthJapanese + 1; i++) {
    var row = range[i];
    mainWord = row[0];
    if (!mainWord == ""){
      try{romaji = ' ' + row[1];} catch(e) {romaji = '';}
      try{usage = ': ' + row[4];} catch(e) {usage = '';}
      text = mainWord + romaji + usage;
      //totalJapanese = totalJapanese + "%0A" + text;
      try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
    } else {
      randomiser.getRange("C4").setValue(i + monthJapanese);
      break;
    }
  }
  //try{sendText(totalJapanese)} catch(e) {sendText("Month Japanese cannot")};
  
  var monthKorean = randomiser.getRange("D4").getValues()[0][0];
  var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
  var range = korean.getRange(monthKorean,1,korean.getMaxRows() - monthKorean + 1,9).getValues();
  //var totalKorean = "";
  for (var i = 0; i < korean.getMaxRows() - monthKorean + 1; i++) {
    var row = range[i];
    mainWord = row[0];
    if (!mainWord == ""){
      try{romanized = ' ' + row[1];} catch(e) {romanized = '';}
      try{usage = ': ' + row[5];} catch(e) {usage = '';}
      text = mainWord + romanized + usage;
      //totalKorean = totalKorean + "%0A" + text;
      try{sendText(text)} catch(e) {sendText(mainWord + " cannot")};
    } else {
      randomiser.getRange("D4").setValue(i + monthKorean);
      break;
    }
  }
  //try{sendText(totalKorean)} catch(e) {sendText("Month Korean cannot")};
}

function newVocab() {
  timeNow = new Date;
  var hourNow = parseInt(timeNow.toString()[16] + timeNow.toString()[17]);
  
  if ((hourNow < 23) & (hourNow > 7)) {
    var randomiser = SpreadsheetApp.openById(ssId).getSheetByName('Randomiser');
    var minus7c = randomiser.getRange("B11").getValues()[0][0];
    var minus7j = randomiser.getRange("C11").getValues()[0][0];
    var minus7k = randomiser.getRange("D11").getValues()[0][0];
    
    var chinese = SpreadsheetApp.openById(ssId).getSheetByName('Chinese');
    var japanese = SpreadsheetApp.openById(ssId).getSheetByName('Japanese');
    var korean = SpreadsheetApp.openById(ssId).getSheetByName('Korean');
    
    randomiser.getRange("B12").setValue(chinese.getRange("A1").getDataRegion().getNumRows());
    randomiser.getRange("C12").setValue(japanese.getRange("A1").getDataRegion().getNumRows());
    randomiser.getRange("D12").setValue(korean.getRange("A1").getDataRegion().getNumRows());
    
    var randomc = randomiser.getRange("B13").getValues()[0][0];
    var randomj = randomiser.getRange("C13").getValues()[0][0];
    var randomk = randomiser.getRange("D13").getValues()[0][0];
    
    var rowc = chinese.getRange(randomc,1,1,9).getValues()[0];
    var rowj = japanese.getRange(randomj,1,1,10).getValues()[0];
    var rowk = korean.getRange(randomk,1,1,10).getValues()[0];
    
    wordc = rowc[0];
    try{pinyin = ' ' + rowc[2];} catch(e) {pinyin = '';}
    try{usage = ': ' + rowc[4];} catch(e) {usage = '';}
    try{sentence = rowc[5];sentencePinyin = rowc[6];sentenceMeaning = rowc[7];} catch(e) {sentence = '';sentencePinyin = '';sentenceMeaning = '';}
    if (!sentence == "") {
      sentence = '%0A' + sentence;
      sentencePinyin = '%0A' + sentencePinyin;
      sentenceMeaning = '%0A' + sentenceMeaning;
    }
    try{
      textc = wordc + pinyin + usage + sentence + sentencePinyin + sentenceMeaning;
      sendText(textc);
    } catch(e) {
      textc = wordc + pinyin + usage;
      try{sendText(textc)} catch(e) {sendText(wordc + " cannot")};
    }
    
    wordj = rowj[0];
    try{romaji = ' ' + rowj[1];} catch(e) {romaji = '';}
    try{usage = ': ' + rowj[4];} catch(e) {usage = '';}
    try{sentence = rowj[5];sentenceRomaji = rowj[6];sentenceMeaning = rowj[7];} catch(e) {sentence = '';sentenceRomaji = '';sentenceMeaning = '';}
    if (!sentence == "") {
      sentence = '%0A' + sentence;
      sentenceRomaji = '%0A' + sentenceRomaji;
      sentenceMeaning = '%0A' + sentenceMeaning;
    }
    try{
      textj = wordj + romaji + usage + sentence + sentenceRomaji + sentenceMeaning;
      sendText(textj);
    } catch(e) {
      textj = wordj + romaji + usage;
      try{sendText(textj)} catch(e) {sendText(wordj + " cannot")};
    }
    
    wordk = rowk[0];
    try{romanized = ' ' + rowk[1];} catch(e) {romanized = '';}
    try{usage = ': ' + rowk[5];} catch(e) {usage = '';}
    try{sentence = rowk[6];sentenceRomaji = rowk[7];sentenceMeaning = rowk[8];} catch(e) {sentence = '';sentenceRomanized = '';sentenceMeaning = '';}
    if (!sentence == "") {
      sentence = '%0A' + sentence;
      sentenceRomanized = '%0A' + sentenceRomanized;
      sentenceMeaning = '%0A' + sentenceMeaning;
    }
    try{
      textk = wordk + romanized + usage + sentence + sentenceRomanized + sentenceMeaning;
      sendText(textk);
    } catch(e) {
      textk = wordk + romanized + usage;
      try{sendText(textk)} catch(e) {sendText(wordk + " cannot")};
    }
  }
}