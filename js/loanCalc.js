
//bind event
document.querySelector('#calculate').addEventListener('click', loanTime);

//event handler
function loanTime(){
    $('.loan').slideUp();
    $('.display').slideUp();

    var out = "";

    var get = document.getElementById('amount');
    var amt = parseInt(get.value);
    console.log(amt);

    get = document.getElementById('rate');
    var rate = parseFloat(get.value);
    rate = .01*rate;
    console.log(rate);

    get = document.getElementById('term');
    var term = parseInt(get.value);
    console.log(term);

    get = document.getElementById('start');
    var year = parseInt(get.value);
    console.log(year);

    //input verification
    if (Number.isNaN(amt) || Number.isNaN(rate) || Number.isNaN(term) || Number.isNaN(year)){
        console.log("Invalid Input Detected");
        $('.loan').slideDown();
    }

    else{
        //calc monthly payment
        out = "<p>Monthly Payment: ";

        var monthly = amt*((rate/12)/(1-Math.pow((1+(rate/12)), ((-12)*term))));
        console.log("mPay: "+monthly);

        out += monthly.toFixed(2)+"</p>";


        //create table
        out += "<table><tr> <td>Date</td> <td>Interest</td> <td>Principal</td> <td>Balance</td> </tr>";
        var ipm = 1.1;
        var ppm = 1.1;
        var ipy = 0;
        var ppy = 0;

        for (i=1; i<=term; i++){
            ipy = 0;
            ppy = 0;
            year = year+1;                          //date

            //calc per month needs to be in a loop since interest changes each month
            for (j=1; j<=12; j++){
                ipm = (rate/12)*amt;                //interest paid per month
                ipy += ipm;                         //interest paid per year

                ppm = monthly - (amt*(rate/12));    //principal paid per month
                ppy += ppm;                         //principal paid per year

                amt = amt-ppm;                      //balance
            }
            
            console.log("date: "+year+"  inPerYear: "+ipy.toFixed(2)+"  prinPerYear: "+ppy.toFixed(2)+"  balance: "+amt.toFixed(2));
            out += "<tr> <td>"+year+"</td> <td>"+ipy.toFixed(2)+"</td> <td>"+ppy.toFixed(2)+"</td> <td>"+amt.toFixed(2)+"</td> </tr>";
        }

        //output
        out += "</table>";
        document.getElementById('output').innerHTML = out;

        $('.display').slideDown();
    }
}