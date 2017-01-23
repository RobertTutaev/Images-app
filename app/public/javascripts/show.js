function show(host, port, n, b) {
    
    var id_end=b;
    var id_begin;
    var socket = io.connect('http://'+host+':'+port);
    
    socket.on('message', function (data) {
        
        // Добавляем картинку
        id_end++;
        $("#messages").append(
            '<img name="image" id="' + id_end + '" src="../images/' + 
                data.name_temp + '" title="' + safe(data.name_orig) + '" height="100">');
        
        // Удаляем картинку
        id_begin=id_end-n;
        $('#' + id_begin + '[name="image"]').remove();    
    });
    
    // Удаляем спец. символы из оригинального названия
    function safe(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}