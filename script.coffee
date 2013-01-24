jQuery ->
    $('#starform').submit ->
        fl = $('#starform input[name=focallength]').val()
        ps = $('#starform input[name=pixelsize]').val()
        if $.isNumeric(fl) && $.isNumeric(ps)
            $.get '/calc', { focallength: fl, pixelsize: ps }, (data) ->
                output = $('#output')
                output.empty()
                output.append($('<p>').append("Arcminutes per mm : " + data['arcminutes-per-mm']))
                output.append($('<p>').append("Arcseconds per mm : " + data['arcseconds-per-mm']))
                output.append($('<p>').append("Arcseconds per pixel : " + data['arcseconds-per-pixel']))
                output.append($('<p>').append("Maximum Exposure in seconds : " + data['max-exposure-length']))
        return false;