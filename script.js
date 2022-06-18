let div,all;
var breweries = [];
var copyBreweries = [];
async function getBreweries(){
    let response = await fetch('https://api.openbrewerydb.org/breweries', {
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json',
                  }})
    
      let allbreweries = await response.json();
      return allbreweries;
  }
  getBreweries().then(resp =>{
    resp.forEach(val =>{
        if(val.street == null){
            val.street = '';
        }
        if(val.phone == null){
            val.phone = '-';
        }
        if(val.website_url == null){
            val.website_url = '-'
        }
    })
    breweries = resp
    copyBreweries = resp;
    displayBreweries();
  })
  .catch(error =>{
    console.log('Oops,Something Went Wrong '+error)
  })


function searchEvent(){
    var text = document.getElementById('eventSearch');
    if(text.value != '' && text.value.trim()){
        //search this event
        breweries = this.copyBreweries.filter((item) => {
            return (item.name.toLowerCase().indexOf(text.value.toLowerCase()) > -1)
          })
          var temp = document.querySelector('.newcss');
          temp.innerHTML = ''; 
          displayBreweries();
    }
    else
    {
        var temp = document.querySelector('.newcss');
        temp.innerHTML = ''; 
        breweries = copyBreweries;
        displayBreweries();
    }
}

function displayBreweries(){
    breweries.forEach(val =>{
        var temp = document.querySelector('.newcss');
        all = `<div class='card-content'><h3>Breweries Name: ${val.name}</h3>`
        all +=`<div class='info'><p> <b>Breweries Type:</b> ${val.brewery_type}</p>`
        all += `<p><b>Address:</b> ${val.street},${val.city},${val.state},${val.country}</p>`
        all += `<p><b>Phone:</b> ${val.phone}</p>`
        all += `<p><b>Website Url :</b> <a href="${val.website_url}" target="_blank">${val.website_url}</a></p>`
        all += `</div></div>`;
        temp.innerHTML += all;   
    })
}
