import React, {useState} from 'react'


import TrendingClassrooms from "../../../components/Partials/HomePage/Trending";
import SearchContainer from "../../../components/Partials/SearchContainer";
import "./auth.css";

function Auth_Home() {
    const host = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const [searchInput, setSearchInput] = useState({touched: false,value:''});
    const [results, setResults] = useState({result:null});

    const handleSearchInputChange = (e) => {
        e.preventDefault();
        setSearchInput({touched:true,value:e.target.value});

    let url = `${host}classroom/search/${e.target.value}`;
        

    
    if(e.target.value && e.target.value.length >= 2){

        let searchClassroomRequest =  new Request(url, {
            method: 'GET',
            cache: 'default',
            headers: myHeaders,
            mode: 'cors'
        });

        fetch(searchClassroomRequest).then(d => d.json()).then(m => {
            if(m.data && m.data.length >= 1){
                setResults({result:m.data});
            } else {
                setResults({result:null});
            }
             console.log(m);
        }).catch(err => {
             setResults({result:'Opps! Something went wrong'});
             console.log(err);
        });

    } else {
        setResults({result:null});
    }

    
    } 
    return (
        <div className="colab__container">
           {/* start search container */}
            <div className="search__container row">
                <div className="search__input__container">
                <div className="card border-0 shadow-lg rounded-lg card-dark bg-translucent-white">
    <div className="card-body">
    <form action={`/classroom/search/q/${searchInput.value}`} >

        <h5 className="font-weight-bold text-center mb-2">Find Classrooms</h5>
        <div className="form-group">
    <div className="input-group">
      <input type="search"
      value={searchInput.value}
      onChange={handleSearchInputChange}
      className="form-control"
       placeholder="Over 1,000,000 Classrooms"
        aria-label="Over 1,000,000 Classrooms"
         aria-describedby="basic-addon2" />
      <div className="input-group-append">
        <button type="submit" className="btn btn-success" id="basic-addon2"><i className="fa fa-search"></i></button>
      </div>
    </div>
    </div>
    <SearchContainer display={results.result} results={results.result}/>

</form>

    </div>
</div>
                </div>
            </div>

{/* end search container */}


<div className="all__classrooms__container">
    <div className="row mr-3 ml-3">
        <div className="trending__container w-100 pt-4">
            <div className="trending__title mb-3 text-center ">
                <h3 className="font-weight-700 text-capitalize d-inline pr-3">Trending </h3> <i className="fa fa-fire fa-4x"></i>
            </div>
        <TrendingClassrooms />
        </div>
    </div>
</div>
        </div>
    )
}


export default Auth_Home;