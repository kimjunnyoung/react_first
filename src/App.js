import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  return(
  <header>
    <h1><a href='/' onClick={(event) => {
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
    <p>{props.body}</p>
  </header>
  )}

function Nav(props){
  let lis = []
  for(let i=0; i<props.topics.length; i++){
    const topic = props.topics[i];
    lis.push(<li key={topic.id}><a id={topic.id} href={'/read/' + topic.id} onClick={(event) => {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{topic.title}</a></li>)
  }
  return(
  <nav>
    <ol>
      {lis}
    </ol>
  </nav>
  )}

function Article(props){
  return(
  <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
  )}

function Create(props) {
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
          event.preventDefault();
          props.onCreate(event.target.title.value, event.target.body.value);
      }}>
        <p><input type='text' name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='Create'></input></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, Setmode] = useState('WELCOME');
  const [id, Setid] = useState(null);
  const [topics, Settopcis] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ])
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title='welcome' body='Hello, Web'></Article>
  }
  else if(mode === 'READ'){
    let _title, _body = '';
    for(let i=0; i<topics.length; i++){
      console.log(id);
      if(topics[i].id === id){
        _title = topics[i].title;
        _body = topics[i].body;
        break;
      }
      }
    console.log(_title, _body);
    content = <Article title={_title} body={_body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id:4, title:'react', body:'react is ...'};
      topics.push(newTopic);
      // Setmode('READ');
      // Setid(4);
      console.log(_title, _body);
      console.log(topics);
    }}></Create>
  }
  return (
    <div className="App">
      <Header title='WEB' body='목차.' onChangeMode={() => {
        Setmode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) =>{
        Setmode('READ');
        Setid(_id);
      }}></Nav>
      {content}
      <a href='/create' onClick={(event) => {
        event.preventDefault();
        Setmode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App;
