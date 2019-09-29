import React from "react";
// import * as actions from '../../redux/actions/'

import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'
// import Spinner from '../../components/Partials/Preloader';

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input";
import Helmet from '../../components/SEO/helmet';

import Select from '../../components/Partials/Select';

import './newclassroom.css';

function NewClassroom(props) {

  const class_size = [
    {
      label: '< 20',
      value: 50
    },
    {
      label: '< 30',
      value: 30
    }
  ]

  const class_visibility = [
    {
      label: 'Anyone can join',
      value: 'anyone'
    },
    {
      label: 'Private',
      value: 'private'
    }
  ]
  const state = useSelector(state => state)
  // const dispatch = useDispatch()

  // const [values, setValues] = React.useState({
  //   name: "",
  //   size: "> 10",
  //   date: Date(),
  //   time:Date(),
  //   topic: "",
  //   owner: state.auth.userId,
  //   visibility:'public',
  //   buttonValue:'SETUP',
  //   description:'',
  //   token:state.auth.token,
  //   location:''
  // });
  
  /**
   * Handle input change
   */
  // const handleValueChange = name => event => {
  
  //   if(name === 'date' || name === 'time'){
  //     setValues({...values,[name]:event})
  //   }else{
  //   setValues({ ...values, [name]: event.target.value });

  //   }
  
  // };
  
// const handleClassCreatinon = (e) => {

//     e.preventDefault()
//     dispatch(actions.createNewClass(values))
//     setValues({...values,buttonValue:<Spinner/>})
   
//     if(state.classroom.errors){

//       setValues({...values,buttonValue:'SETUP'})
//   }
// }

if(state.classroom.classdetails){
  return (<Redirect to={`/classroom/preview/${state.classroom.classdetails._id}`}/>)
}

  return (
    <div>
      <Helmet title="Create a classroom || colab.inc" metaDescription="">
        </Helmet>

      <section >
        <div class="row min-vh-100">
          <div class="col-md-6 col-lg-6 col-xl-6 p-7 pl-3 pr-3 py-6 py-md-0">
            <div>
              <div class="mb-5 mt-2 text-center">
                <b class="text-muted mb-0">
                  Hello, {'user'}
                </b>
              </div>
              <span class="clearfix" />
              <form>
                      {/* pasword input */}
                <Input
                  type="text"
                  placeholder="Dragon Riders"
                  label="Classroom name"
                />

                <Input
                  type="text"
                  placeholder="Webpack reloaded"
                  label="Class Topic"
                />

              <Select options={class_size} label='class size' />


                <Input
                  type="text"
                  placeholder="Let's build something really nice"
                  label="Class Description"
                />

              <Select options={class_visibility} label='Visibility' />
                
                

                <div className="mt-4">
                  <Button type="button" textColor="#fff" block color="success">
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
      {/* image section */}

      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-6 py-md-0 side">
            <div className="align-content-center justify-content-center ">
              <div className="pt-5 text-center">
                <h6 className="h3 mb-1">
                Create your Free Classroom Today!
                
                </h6>
              </div>
              <span className="clearfix" />
              
            </div>
          </div>
          

        </div>
      </section>
    </div>
  );
}


export default NewClassroom


