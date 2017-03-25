$(document).ready(()=>
{
    $('#searchForm').on('submit',(e)=>
    {
        let searchval=$('#searchText').val();
        
        getMovies(searchval);
        e.preventDefault(); 
    });
});

function getMovies(searchval)
{
    axios.get('http://www.omdbapi.com/?s='+searchval).then((response)=>
    {

        console.log(response);

        let movies=response.data.Search;
        let output='';

        $.each(movies, (index,movie)=>
        {
            output+=`
            <div class="col-md-3">
            <div id="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieselected(${'movie.imdbID'})" class="btn btn-primary" href="movie.html">Movie details</a>
            </div>
            </div>
            `;
        })
     $('#movies').html(output); 
    }).catch
    ( ()=>{console.log("error!");});

}

function movieselected(id)
{
    sessionStorage.setItem('movieId',id);
    window.location= 'movie.html'; 
    return false;
}

function getMovie()
{
    let movieId=sessionStorage.getItem('movieId');
     axios.get('http://www.omdbapi.com/?s='+movieId).then((response)=>
    {

     console.log(response);
     let movie=response.data;
     let output=`
     <div class="row">
        <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
        </div>

        <div class="col-md-8">
        
        </div>
     </div>
     `

     ('#movie').html(output);
    }).catch
    (()=>{console.log("error!");});
    
}