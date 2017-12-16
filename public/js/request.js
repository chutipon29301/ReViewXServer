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

$('#editGenre').click(_ => {
    $.post('/post/v1/deleteGenre', $('#editGenreFrom').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#deleteReview').click(_ => {
    $.post('/post/v1/deleteReview', $('#deleteReviewFrom').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});