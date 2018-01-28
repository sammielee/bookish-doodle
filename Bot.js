function inArray(message, array)
{
    for(var i = 0; i< array.length; i++)
    {
        if(message.includes(""+array[i]) ) //&& isWord(array[i], message))
            return true;
    }
    return false;
}

function getResponse(array)
{
    return array[Math.floor(Math.random()*array.length)];
}

function findSubject(array, message)
{
    for(var i = 0; i< array.length; i++)
    {
        if(message.includes(""+array[i]) ) // && isWord(array[i], message))
        {
            // return "here";
            var subject = message.substring(array[i].length+1)
            return subject;
        }
    }
    return "epic fail here... ";
    
}

function isWord(substring, message){
    var init = message.indexOf(substring);
    return ((init === 0 || notLetter(message.charAt(init-1))) && 
        (init + substring.length+1==message.length || notLetter(message.charAt(init+substring.length+1))))

}

function notLetter(char) {
    if((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))
    {
        return false
    }
    return true;
}

/** Functions declared below are required **/
function EventHandler(context, event) {
    if(! context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;

    var question = {
            "type": "survey",
             "question": "Please select your foreign language level:",
             "msgid": "3er45",
             "options": ["Novice","Experienced"]
    }; 
    context.sendResponse(JSON.stringify(question));
}

function HttpResponseHandler(context, event) {
    if (event.messageobj.refmsgid=='3er45'){
      var response = "Great! Hi, I am Saluton. I look forward to chatting with you! :)";
      if (event.message == "Novice") {
          response += " Talk to me in English, and I will reply to you in Chinese.";
      } else {
          response += "Make sure to talk to me in Chinese!";
      }
      context.sendResponse(response);
      return;
    }
    var response = JSON.parse(event.getresp);
    var translation = response.data.translations[0].translatedText;
    context.console.log(translation);
    context.sendResponse(translation+" ("+plannedResponse+")");
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}
