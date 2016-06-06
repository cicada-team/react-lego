/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import * as BusinessCard from './components/BusinessCard';
import * as BusinessCardInput from './components/BusinessCardInput';
import { createIngredients } from 'react-lego-redux';

/*
 create reducers/actions, and bind component to redux store state.
 */
const EnglishBusinessCardInput = createIngredients('englishName')(BusinessCardInput);
const ChineseBusinessCardInput = createIngredients('chineseName')(BusinessCardInput);

const store = createStore(combineReducers({
  englishName: EnglishBusinessCardInput.reducer,
  chineseName: ChineseBusinessCardInput.reducer,
}), {}, window.devToolsExtension ? window.devToolsExtension() : f => f);

/*
 overwrite BusinessCardInput render method, but use the same reduce functions.
 */
const overwriteBusinessCardInput = props => (
  <div>
    <span>姓</span>
    <input value={props.lastName} onChange={props.onLastNameChange} />
    <span>名</span>
    <input value={props.firstName} onChange={props.onFirstNameChange} />
  </div>
);

overwriteBusinessCardInput.propTypes = BusinessCardInput.propTypes;


/*
 render
 */
const App = () => {
  const ECard = EnglishBusinessCardInput
    .connect(state => state.englishName)(BusinessCardInput.render);

  const CCard = ChineseBusinessCardInput
    .connect(state => state.chineseName)(overwriteBusinessCardInput);

  return (
    <div>
      <div>
        <h1>English Name</h1>
        <ECard />
      </div>
      <div>
        <h1>Chinese Name</h1>
        <CCard />
      </div>
    </div>
  );
};

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

