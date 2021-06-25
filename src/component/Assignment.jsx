
import React, { Component } from 'react'


export default class Classplus extends Component {
    state = { pictures: [], display:[], currText:""}

     updateText= (e)=>{
        let currVal= e.target.value;
        currVal = currVal.toLowerCase()
        let filteredArr= this.state.pictures.filter((ele)=>{
            return ele.title.toLowerCase().includes(currVal,0);
        })

        this.setState({display:filteredArr,currText: currVal})    
     }
     displayResult=()=>{
         let val= this.state.currText;
         this.componentWillMount(val);
        }
    

     async componentDidMount(){
        let resp= await fetch(" https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&format=json&nojsoncallback=1&api_sig=891c234ff88565ed46c43c3dc792b94a");
        let pics= await resp.json();
        
        this.setState({pictures:pics.photos.photo, display:pics.photos.photo });
        
        }
        async componentWillMount(query){
            let searchResults= await fetch(` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8e9c7f2e239b4eb0480d6c4e2550cc10&tags=${query}&text=${query}&format=json&nojsoncallback=1`);
            let results= await searchResults.json();
            
            this.setState({display:results.photos.photo})  
            
        }
    

    render() {
        let count = this.state.display.length
        
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div class="container-fluid">
                    <a class="navbar-brand">Search Here</a>
                    {/* <form class="d-flex"> */}
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.updateText}/>
                    <button class="btn btn-outline-success" onClick={this.displayResult}>Search</button>
                    {/* </form> */}
                </div>
                </nav>
                
                {
                    this.state.display.map((pic)=>{
                        if(count == 0){
                            return (<h1>No results found</h1>)
                        }
                        else{
                            const srcPath=`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
                        return(
                          <img class="thumbnail img-responsive" alt="dogs" src={srcPath}></img>
                        )
                        }
                        
                    })
                }
                

                
              



            </div>
        )
    }
}
 