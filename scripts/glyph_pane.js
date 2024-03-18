// Compute the width that a Mayan Vigesimal-By-Fives numeral will require
function numeral_space(numeral){
    return Math.floor(Math.max(0, numeral-1) / 5) + 1;
}

function glyph_pair_long_count(numeral, radix, translation){
    return '<div class="glyphPairPane"><img src="images/glyphs/numerals/'+numeral+'.png" class="glyphPairL'+numeral_space(numeral)+'" alt="'+numeral+'"><img src="images/glyphs/longcount/'+radix+'.png" alt="'+radix+'"><div class="glyphOverlay"><b>'+transcription[numeral]+'-'+transcription[radix]+'</b><br /><i>'+fancyname[numeral]+' '+translation+'</i></div></div>';
}

function glyph_pair_tzolkin(trecena, veintena){
    return '<div class="glyphPairPane"><img src="images/glyphs/numerals/'+trecena+'.png" class="glyphPairL'+numeral_space(trecena)+'" alt="'+trecena+'"><img src="images/glyphs/tzolkin/'+veintena+'.png" alt="'+veintena+'"><div class="glyphOverlay"><b>'+transcription[trecena]+'-'+transcription[veintena]+'</b><br /><i>'+fancyname[trecena]+' '+fancyname[veintena]+'</i></div></div>';
}

function glyph_pair_haab(day, month){
    return '<div class="glyphPairPane"><img src="images/glyphs/numerals/'+((day==0)?'seating':day)+'.png" class="glyphPairL'+((day==0)?3:numeral_space(day))+'" alt="'+day+'"><img src="images/glyphs/haab/'+month+'.png" alt="'+month+'"><div class="glyphOverlay"><b>'+((day==0)?'CHUM':transcription[day])+'-'+transcription[month]+'</b><br /><i>'+((day==0)?'seating of':fancyname[day])+' '+fancyname[month]+'</i></div></div>';
}

function glyph_single_g(g){
    return '<div class="glyphPairPane"><img src="images/glyphs/supplementary/G'+g+'.png" class="glyphPairFull" alt="G'+g+'"><div class="glyphOverlay"><b>'+transcription['G'+g]+'</b><br /><i>G'+g+'</i></div></div>';
}
