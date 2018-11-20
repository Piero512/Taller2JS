function createURL(searchString){
    return 'https://twitrss.me/twitter_search_to_rss/?' + $.param({"term":searchString})
}

function readRSSFeed(xmlResponse){
    
    $(xmlResponse).find("item").each( (index ,tweet) => {
        var tuit = $(tweet).find("title").text()
        var author = $(tweet).find("dc\\:creator").text()
        var fecha = $(tweet).find("pubDate").text()
        var link = $(tweet).find("link").text()
        var lista = document.getElementById("listaTweets")
        var tuit_html = document.createDocumentFragment()
        // Crear los tweets. 
        var card = tuit_html.appendChild(document.createElement("div"))
        card.classList.add("card")
        var card_content = card.appendChild(document.createElement("div"))
        card_content.classList.add("card-body")
        var autor = card_content.appendChild(document.createElement("h2"))
        autor.innerText = `${author} dijo:`;
        autor.classList.add("card-title")
        var cont = card_content.appendChild(document.createElement("p"))
        cont.innerText = tuit;
        cont.classList.add('card-text')
        var date = card_content.appendChild(document.createElement("h4"))
        date.innerText = `${fecha}`;
        var a = card_content.appendChild(document.createElement("a"))
        a.setAttribute("href",link)
        a.innerText = "Link al tweet";
        lista.appendChild(tuit_html);
    });
    
}

$("#searchButton").on("click",function (event){
    var search = $("#search").val()
    $.ajax({
        url: createURL(search),
        success: readRSSFeed,
        method: "GET",
        dataType: "xml"
    });

    return false;
})