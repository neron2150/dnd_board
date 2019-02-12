import React,{Component} from 'react';
class Universities extends Component {
  state = {
    response: []
  };
  prepareData = ()=> 
    this.state.response.map((name, index)=>{
      return{title:name, id:index};
    });
  
  componentDidMount() {
    fetch('https://timetable-dev-api.herokuapp.com/api/faculties?university=bsuir')
    .then(data=>data.json())  
    .then(resp=>{
        this.setState({response:resp});
        console.log(resp);
      });
  }
  render() {
    return <React.Fragment>
        <ul>
        {this.prepareData().map(
            (uni)=>{return<li key={uni.id}>{uni.title}</li>}
          )}
        </ul>
      </React.Fragment>
      
  }
}

export default Universities;