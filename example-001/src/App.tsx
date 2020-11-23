import React, {Dispatch, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

const startIngredients = ["Ham", "Pineapple", "Cheese", "Pepperoni", "Mushroom"].map(x => ({
    id: x.toLowerCase(),
    name: x,
}));
const defaultIngredientsState = reduceToObject(startIngredients.map(x => ({checked: false, ...x})))
type IngredientsState = IDableObjectDict<{ id: string, name: string, checked: boolean }>


function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default function App() {
    const [ingredientsState, setIngredientsState] = useState(defaultIngredientsState)
    const [disabled, setDisabled] = useState(false)
    const ingredients = Object.values(ingredientsState).filter(i => i.checked)

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link role="menuitem" to="/">Home</Link>
                        </li>
                        <li>
                            <Link role="menuitem" to="/about">About</Link>
                        </li>
                        <li>
                            <Link role="menuitem" to="/users">Users</Link>
                        </li>
                        <li>
                            <Link role="menuitem" to="/forms">Ingredients: <span>{ingredients.length}</span></Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/forms">
                        <Forms
                            ingredients={ingredientsState}
                            updateIngredients={(newIngredientsState)=> {
                                setDisabled(true)
                                setTimeout(()=>{
                                    setIngredientsState(newIngredientsState)
                                    setDisabled(false)
                                }, 500)
                            }}
                            disabled={disabled}
                        />
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

interface IDableObject {
    id: string;
}

type IDableObjectDict<I extends IDableObject> = { [index: string]: I }

function reduceToObject<I extends IDableObject>(list: I[]): IDableObjectDict<I> {
    return list.reduce((result, item) => {
        result[item.id] = item;
        return result
    }, {} as IDableObjectDict<I>)
}

function Forms(props: {
                   ingredients: IngredientsState,
                   updateIngredients: Dispatch<IngredientsState>,
                   disabled: boolean
               },
) {
    const {ingredients, updateIngredients, disabled} = props

    return <div>
        <h1>Form</h1>
        <form action="">
            <fieldset>
                <legend>Select your pizza toppings:</legend>
                {Object.values(ingredients).map(ingredient => (<div key={ingredient.id}>
                        <input
                            id={ingredient.id}
                            type="checkbox"
                            name="toppings"
                            value={ingredient.id}
                            checked={ingredient.checked}
                            disabled={disabled}
                            onChange={() => {
                                updateIngredients(
                                    {
                                        ...ingredients, [ingredient.id]: {...ingredient, checked: !ingredient.checked},
                                    })
                            }}
                        />
                        <label htmlFor={ingredient.id}>{ingredient.name}</label>
                    </div>),
                )}
            </fieldset>
        </form>
        <h2>Ingredients</h2>
        <table>
            <tbody>
            <tr>
                <th>Name</th>
            </tr>
            {Object.values(ingredients).filter(i => i.checked).map(ingredient => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                    </tr>
                ),
            )}
            </tbody>
        </table>
    </div>
}

