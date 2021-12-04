
//initialise parameters
let apiKey = "758cb05911bd4a9c82a4e729640d919e";

fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`)
.then(response => response.json())
.then((data)=>{
    console.log(data.sources);
    let color=["primary","secondary","sucess","danger","warning","info","light","dark"];

    let articles = data.sources;
    let news = " ";
    let box = document.getElementById("list");
    articles.forEach((element,index)=>{
    
        if(element["description"]!=null){

            let str = `
  <li class="newses"> <b>Breaking News ${index+1} </b>: ${element["description"]} <a href="${element["url"]}" target="_blank"> Read More...</a></li>`;
 
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
        
fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)
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
    articles.forEach((element,index)=>{

        if(regex.test(element["title"])){ 
            if(element["title"]!=null && element["urlToImage"]!=null && element["content"]!=null){
    
                let str = `<li class="list-group-item list-group-item-${color[(index%8)+1]}"> <b>Breaking News </b>: ${element["description"]}</li>`;
     
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