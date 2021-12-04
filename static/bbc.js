let apiKey = "758cb05911bd4a9c82a4e729640d919e";

fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`)
.then(response => response.json())
.then((data)=>{
    console.log(data.articles);

    let articles = data.articles;
    let news = " ";
    let box = document.getElementById("box");
    articles.forEach((element)=>{
    
        if(element["title"]!=null && element["urlToImage"]!=null && element["content"]!=null){

            let str = `<div class="fluid-container"><div id="header"><h1>${element["title"]}</h1></div>
                       <div class="card"><img id="photo" src="${element["urlToImage"]}" width="35%" height="40%">
                       <p id="para">${element["content"]} <a href="${element["url"]}">read more..</a></p></div></div>
                       <hr>`;
 
            news+= str;
        }
    })
    
    box.innerHTML=news;
    
})


//Search bar function
setTimeout(function(){
    document.querySelector('button').addEventListener('click', function(e){
        e.preventDefault();
        console.log("this is submit button");

        let flag = false;
        
fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`)
    .then(response => response.json())
    .then((data)=>{
    // console.log(data.articles);

    let search = document.getElementById('search-btn');
        let value = search.value;
        let regex = new RegExp("(?=\\w+)"+value+"(?=\\w+)" , "i");
        console.log(regex);

    let articles = data.articles;
    let query = " ";
    let box = document.getElementById("box");
    articles.forEach((element)=>{

        if(regex.test(element["title"])){ 
            if(element["title"]!=null && element["urlToImage"]!=null && element["content"]!=null){
    
                let str = `<div class="fluid-container"><div id="header"><h1>${element["title"]}</h1></div>
                       <div class="card"><img id="photo"  src="${element["urlToImage"]}" width="30%" height="40%">
                       <p id="para">${element["content"]} <a href="${element["url"]}">read more..</a></p></div></div>
                       <hr>`;
     
                query+= str;
                flag=true;
            }
        }
    
    })
    if(flag==false){
        box.innerHTML=`<h1 style="margin:30px 550px;"><b>No Data Found !</b></h1>`;
     }else{
         box.innerHTML=query;
     }
})
    })
},3000);