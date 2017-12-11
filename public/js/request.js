$('form').submit(function(e) {
    e.preventDefault();
});

$('#addGenre').click(_ => {
    $.post('/post/v1/addGenre', $('#addGenreFrom').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#deleteGenre').click(_ => {
    $.post('/post/v1/deleteGenre', $('#deleteGenreFrom').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});