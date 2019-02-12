import React,{Component} from 'react';

class Todos extends Component{
  state = {
    todos: [],
    inputValue:''
  };
  componentDidMount() {
    // const api = new XMLHttpRequest();
    // api.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
    // api.send();

    // if (api.status === 200) {
    //   this.setState({todos: JSON.parse(api.response) });
    // }
    fetch('https://jsonplaceholder.typicode.com/todos').then(
      (response)=>response.json()
    ).then(
      (data)=>{
        console.log(data);
        this.setState({todos: data })}
    );
  }
  handleSearch = (event)=> {
    this.setState({inputValue:event.target.value});
  }
  getFilteredTodos = ()=>
    this.state.todos.filter(
      (todo) =>
        todo.title.indexOf(this.state.inputValue)!==-1
    );

  render() {
    return(
      <React.Fragment>
        {this.props.withSearch && (
          <input
            value={this.state.value}
            onChange={this.handleSearch}
          />
        )}
        <ul>
          {this.getFilteredTodos().map(
            (todo) => {
              return <li key={todo.id}>{todo.title}</li>
            }
          )}
        </ul>
      </React.Fragment>);
  }

}
export default Todos;