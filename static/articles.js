
    setTimeout(function(){
        document.getElementById('btn').addEventListener('click',(e)=>{
            e.preventDefault();
            let input = document.getElementById('searchtxt');
            let val = input.value;
            console.log(val);

            let flag = false;
    
            let apiKey = "758cb05911bd4a9c82a4e729640d919e";
    
            fetch(`https://newsapi.org/v2/everything?q=${val}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then((data)=>{
                console.log(data.articles);
    
                let articles = data.articles;
                let news = " ";
                let box = document.getElementById("sect");
                articles.forEach((element)=>{
                
                    if(element["title"]!=null && element["urlToImage"]!=null && element["description"]!=null){
    
                        let str = `<div class="fluid-container"><div id="head"><h1>${element["title"]}</h1></div>
                                <div class="div1"><img id="photo" src="${element["urlToImage"]}" width="35%" height="40%">
                                <p id="word">${element["description"]}</p></div>
                                <div id="content">${element["content"]} <a href="${element["url"]}" target="_blank">read more..</a></div></div>
                                <hr>`;
            
                        news+= str;
                        flag = true;
                    }
                })
                
                if(flag == true){
                    box.innerHTML=news;
                }
                else{
                    box.innerHTML=`<h1 style="margin:30px 550px;"><b>No Data Found !</b></h1>`;
                }
                
            })
        })

    },3000);