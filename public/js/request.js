$('form').submit(function(e) {
    e.preventDefault();
});

$('#addGenre').click(_ => {
    $.post('/post/v1/addGenre', $('#addGenreForm').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#deleteGenre').click(_ => {
    $.post('/post/v1/deleteGenre', $('#deleteGenreForm').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#editGenre').click(_ => {
    $.post('/post/v1/deleteGenre', $('#editGenreForm').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#deleteReview').click(_ => {
    $.post('/post/v1/deleteReview', $('#deleteReviewForm').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#addLocation').click(_ => {
    $.post('/post/v1/addLocation', $('#addLocationForm').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});

$('#deleteLocation').click(_ => {
    $.post('/post/v1/deleteLocation', $('#deleteLocationForm').serialize()).then( data => {
        alert(data);
    }).catch(err => {
        alert(err.responseText);
    });
});