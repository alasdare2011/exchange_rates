//scripts.js

// Create a request variable and assign a new XMLHttpRequest object to it
var request = new XMLHttpRequest();

// Open a new connection, using the Get request on the URL endpoint
request.open('GET', 'https://www.bankofcanada.ca/valet/observations/' + 
                'group/FX_RATES_DAILY/json?recent=1', true);

request.onload = function(){

    //Parse the request from Bank of Canada
    var data = JSON.parse(this.response);

    //Get date for exchange rates
    var date = data.observations[0].d;
    
    //Get today's date
    var todayDate = dateAsString(new Date());

    //get all elements that have a "date" class
    var dates = document.getElementsByClassName("date");
    
    //assign date to each element with the date class
    var i;
    var result;
    for (i = 0; i < dates.length; i++){

        result = date;

        if(date === todayDate)
        {
           result = date.fontcolor("#0D7680"); 
        }
        
        dates[i].innerHTML = result;

    }

    //Get most current Exchange rates for USD, GBP, EUR, NZD

    var usd = data.observations[0].FXUSDCAD.v.toFixed(4); //united states dollar
    document.getElementById("USD").innerHTML = "$" + usd;

    var gbp = data.observations[0].FXGBPCAD.v; //united kingdom pound
    document.getElementById("GBP").innerHTML = "$" + gbp;

    var eur = data.observations[0].FXEURCAD.v.toFixed(4); //European Euro
    document.getElementById("EUR").innerHTML = "$" + eur;

    var nzd = data.observations[0].FXNZDCAD.v.toFixed(4); //New Zealand dollar
    document.getElementById("NZD").innerHTML = "$" + nzd;

}


// send request
request.send();

/*This helper function takes in a Date object and returns a String with the 
    format YYYY-MM-DD */

function dateAsString(date)
{
    //Create date in same format as date variable
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    if (month.length == 1)
    {
        month = "0" + month;
    }
    var day = (date.getDate().toString());
    if (day.length == 1)
    {
        day = "0" + day;
    }

    var todayDateStr = year + "-" + month + "-" + day;

    return todayDateStr;
}

