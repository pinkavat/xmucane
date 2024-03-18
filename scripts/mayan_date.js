/*
*   mayan_date.js
*
*   Simplified translation of mayan_date.rb for minimal-footprint date conversion.
*   Reads its parameters from the URL and populates mdate and gdate objects for use in page.
*/

// Goodman-Martinez-Thompson conversion constant
const GMT = 584283

// Tzolkin veintena names
const TZ_NAMES = [   "ajaw", "imix", "ik", "akbal", "kan",
                            "chikchan", "kimi", "manik", "lamat",
                            "muluk", "ok", "chuwen", "eb", "ben",
                            "ix", "men", "kib", "kaban", "etznab", "kawak"
                        ]

// Haab month names
const HAAB_NAMES = [ "pop", "wo", "sip", "sotz", "sek",
                    "xul", "yaxkin", "mol", "chen", "yax",
                    "sak", "keh", "mak", "kankin", "muwan",
                    "pax", "kayab", "kumku", "wayeb"
                  ]


// CONVERTERS

// Obtains the MDC from the Long Count
function mdc_from_lc(baktuns, katuns, tuns, winals, kins){
    return kins + 20 * winals + 360 * tuns + 7200 * katuns + 144000 * baktuns;
}


// Computes the MDC from the Gregorian Date
function mdc_from_greg(day, month, year){
    var a = Math.floor((14 - month) / 12);
    var y = year + 4800 - a;
    var m = month + (12 * a) - 3;
    var jday = day + Math.floor(((153*m)+2)/5)+(365*y)+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
    return jday - GMT;
}


// Sets the Mayan Date from the MDC 
function mdate_from_mdc(mdc){

    // Long Count
    var lc_mdc = mdc;
    this.baktuns = Math.floor(lc_mdc / 144000);
    lc_mdc = lc_mdc % 144000;
    this.katuns = Math.floor(lc_mdc / 7200);
    lc_mdc = lc_mdc % 7200;
    this.tuns = Math.floor(lc_mdc / 360);
    lc_mdc = lc_mdc % 360;
    this.winals = Math.floor(lc_mdc / 20);
    this.kins = lc_mdc % 20;

    // Tzolk'in
    var tzolkin_pos = (mdc + 159) % 260;
    this.trecena = (tzolkin_pos % 13) + 1;
    this.veintena = TZ_NAMES[Math.abs(tzolkin_pos + 1) % 20];

    // Haab'
    var haab_pos = (mdc + 348) % 365;
    this.day = haab_pos % 20;
    this.month = HAAB_NAMES[Math.floor(haab_pos / 20)];

    // Supplementary
    this.g = (mdc % 9 == 0) ? 9 : (mdc % 9); 

}


// Sets the Gregorian Date from the MDC
function gdate_from_mdc(mdc){
    var j = mdc + GMT;
    var f = j + 1363 + Math.floor((Math.floor((4 * j + 274277) / 146097) * 3) / 4);
    var e = 4 * f + 3;
    var h = 5 * Math.floor((e % 1461) / 4) + 2;
    this.day = Math.floor((h % 153) / 5) + 1;
    this.month = ((Math.floor(h / 153) + 2) % 12) + 1;
    var y = Math.floor(e / 1461) - 4716 + Math.floor((14 - this.month) / 12);

    if (y < 0){
        this.era = 'bce';
        this.year = 1 - y;
    } else {
        this.era = 'ce';
        this.year = y;
    }
}




// MAIN

// Parse URL parameters
params = new URLSearchParams(window.location.search); 

var mdc = 0;

if (params.has('mdc')){
    // Direct from Mayan Day number
    mdc = parseInt(params.get('mdc'));

} else if (params.has('baktuns')) {
    // Conversion from Long Count
    mdc = mdc_from_lc(parseInt(params.get('baktuns')), parseInt(params.get('katuns')), parseInt(params.get('tuns')), parseInt(params.get('winals')), parseInt(params.get('kins')));

} else if (params.has('gday')) {
    // Conversion from Gregorian Date
    var year = parseInt(params.get('gyear'));
    mdc = mdc_from_greg(parseInt(params.get('gday')), parseInt(params.get('gmonth')), (params.get('gera') == 'bce') ? (1 - year) : year);

} else {
    // Compute from Today's Date.
    var date = new Date();
    mdc = mdc_from_greg(date.getDate(), date.getMonth() + 1, date.getFullYear());

}

console.log(mdc);

// Update date outputs.
var mdate = new mdate_from_mdc(mdc)
var gdate = new gdate_from_mdc(mdc)
