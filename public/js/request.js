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
    console.log($('#addLocationForm').serialize());
    $.post('/post/v1/addLocation', $('#addLocationForm').serialize()).then( data => {
        alert(data);
        console.log(data);
    }).catch(err => {
        console.log(err);
        alert(err.responseText);
    });
});


$('#deleteLocation').click(_ => {
    $.post('/post/v1/deleteLocation', $('#deleteLocationForm').serialize()).then( data => {
        console.log(data);
        alert(data);
    }).catch(err => {
        console.log(err);
        alert(err.responseText);
    });
});

$('#addReadLater').click(_ => {
    $.post('/post/v1/addReadLater', $('#addReadLaterForm').serialize()).then( data => {
        console.log(data);
        alert(data);
    }).catch(err => {
        console.log(err);
        alert(err.responseText);
    });
});

$('#deleteReadLater').click(_ => {
    $.post('/post/v1/deleteReadLater', $('#deleteReadLaterForm').serialize()).then( data => {
        console.log(data);
        alert(data);
    }).catch(err => {
        console.log(err);
        alert(err.responseText);
    });
});