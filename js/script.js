function searchMovie() {
    $('#movie-list').html('');
    // $.getJSON('http://www.omdbapi.com?apikey=8d667bb5&')
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '8d667bb5',
            's': $('#search-input').val()
        },
        success: function (result) {
            // console.log(result);
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">  
                            <div class="card mb-3">
                                <img class="card-img-top" src="`+ data.Poster + `" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year + `</h6>
                                    <a href="`+ data.Link + `" class="card-link see-detail" data-toggle="modal" data-id="`+ data.imdbID + `" data-target="#exampleModal">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');

            }else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center" style="color: red;">`+ result.Error + `</h1>
                <div>
                `);
            }
        }
    });
};


$('#search-button').on('click', function () {
   searchMovie();
});


$('#search-input').on('keyup', function (event) {
    if (event.keyCode === 13) {
        searchMovie();
    };
});


$('#movie-list').on('click', '.see-detail', function () {
    // console.log($(this).data('id'));

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '8d667bb5',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img class="img-fluid" src="`+ movie.Poster + `"></img>
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>`+ movie.Title + `</h4></li>
                                    <li class="list-group-item"><b>Released</b> : `+ movie.Released + `</li>
                                    <li class="list-group-item"><b>Genre</b> : `+ movie.Genre + `</li>
                                    <li class="list-group-item"><b>Director</b> : `+ movie.Director + `</li>
                                    <li class="list-group-item"><b>Actors</b> : `+ movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});