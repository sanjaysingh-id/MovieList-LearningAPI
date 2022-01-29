function searchMovie(params) {
	$('#movie-results').html('');
	$.ajax({
		url: 'http://www.omdbapi.com/',
		type: 'get',
		datatype: 'json',
		data: {
			apikey: '5a811e63',
			s: $('#search-input').val(),
		},
		success: function (r) {
			if (r.Response == 'True') {
				const movies = r.Search;
				$.each(movies, function (i, data) {
					$('#movie-results').append(`
                        <div class="col-md-4 mt-3">
                            <div class="card">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <p class="card-text">${data.Year}</p>
                                    <a class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
				});

				$('#search-input').val('');
			} else {
				$('#movie-results').html(
					`<div class="alert alert-warning alert-dismissible fade show mb-0" role="alert">
                    <strong>${r.Error}</strong> You should check in on some of those fields below.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
				);
			}
		},
	});
}

$('#search-button').on('click', function () {
	searchMovie();
});

$('#search-input').on('keyup', function (e) {
	if (e.which === 13) {
		searchMovie();
	}
});

$('#movie-results').on('click', '.see-detail', function () {
	console.log($(this).data('id'));
	$.ajax({
		url: 'http://www.omdbapi.com/',
		type: 'get',
		datatype: 'json',
		data: {
			apikey: '5a811e63',
			i: $(this).data('id'),
		},
		success: function (detail) {
			if (detail.Response == 'True') {
				$('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4 col-12"><img src="${detail.Poster}" class="img-fluid"/></div>
                            <div class="col-md-8 col-12">
                                <h3>${detail.Title} <span class="badge bg-dark">${detail.Runtime}</span></h3>
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td class="fw-bold">Genre</td>
                                            <td>${detail.Genre}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Released</td>
                                            <td>${detail.Released}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Plot</td>
                                            <td>${detail.Plot}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Director</td>
                                            <td>${detail.Director}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Writer</td>
                                            <td>${detail.Writer}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Box Office</td>
                                            <td>${detail.BoxOffice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `);
			}
		},
	});
});
