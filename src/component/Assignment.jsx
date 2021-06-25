import React, { Component } from 'react'

export default class Classplus extends Component {
    state = { pictures: [], display:[], currText:""}

     updateText= (e)=>{
        let currVal= e.target.value;
        let filteredArr= this.state.pictures.filter((ele)=>{
            return ele.title.toLowerCase().includes(currVal,0);
        })
           
           
        this.setState({display:filteredArr,currText: currVal});
           
     }
     displayResult=()=>{
         let val= this.state.currText;
         let filteredArr= this.state.pictures.filter((ele)=>{
             return ele.title.toLowerCase().includes(val,0);
         })
            
            
         this.setState({display:filteredArr});
            
     }

     async componentDidMount(){
        let resp= await fetch(" https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&format=json&nojsoncallback=1&api_sig=891c234ff88565ed46c43c3dc792b94a");
        let pics= await resp.json();
        console.log(pics.photos.photo);
        this.setState({pictures:pics.photos.photo, display:pics.photos.photo});
        
        
    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-dark bg-dark">
                    <div class="container-fluid">
                    <a class="navbar-brand">Serach Here</a>
                   
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.updateText}/>
                    <button class="btn btn-outline-success" onClick={this.displayResult}>Search</button>
                    
                </div>
                </nav>
                {
                    this.state.display.map((pic)=>{
                        const srcPath=`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
                        return(
                          <img class="thumbnail img-responsive" alt="images" src={srcPath}></img>
                        )
                    })
                }
            </div>
        )
    }
}