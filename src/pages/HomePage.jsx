import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {

    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);



    const getProducts = async () => { 
            try {
                setIsLoading(true);
                const response = await axios.get(`${VITE_BACKEND_URL}/api/products`);
                console.log(response.data);
                setProducts(response.data);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() =>  {
        getProducts();
    }, [])

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md  bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Create Product
                </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5"> 
                {isLoading ? (
                    "Loading...!"
                ) : (
                    <>
                    {products.length > 0 ? (
                        <>
                            {
                                products.map((product) => {
                                    return(
                                        < Product key = {product._id} product = {product} getProducts={getProducts} />
                                    )
                                })
                            }
                        </>
                    ) : (
                        <div>
                            There is no product T_T
                        </div>
                    )}
                    </>

                )}
            </div>

        </div>
    )
}

export default HomePage;


 
/*

-----------------------------------------------------------------------------------------------
line 11-24: 
-----------------------------------------------------------------------------------------------
    useEffect(() => { ... }, [])
-----------------------------------------------------------------------------------------------
useEffect takes two arguments:

1st arg — the "effect" function: () => { ... }. React calls this after the component (HomePage) renders.
         Whatever you put inside is "side effect code" that runs in the background, separate from rendering JSX.
2nd arg — the dependency array: []. Tells React when to re-run the effect. An empty array [] means 
        "run exactly once — on mount, never again." React compares the array; if nothing in it changed since last render, 
        it skips. Since it's empty, there's never anything new to compare, so it fires a single time.
So this whole block is: "After the component first appears on the screen, run this once and never bother me again."
-----------------------------------------------------------------------------------------------



-----------------------------------------------------------------------------------------------
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
-----------------------------------------------------------------------------------------------------
useState([]) creates a state slot that starts as an empty array ([]). It returns two things:
products — the current value (initially []), setProducts — a function you call to update it.
When you call setProducts(newValue), React re-renders the component with the new value.
useState(false) does the same thing for isLoading, starting it as false. The intent here is "we are not loading yet."
The pattern const [thing, setThing] = useState(initialValue) is array destructuring — 
React just happens to return those two items as an array, and you pull them apart by name.
-----------------------------------------------------------------------------------------------



-----------------------------------------------------------------------------------------------
    const response = await axios.get("https://simple-crud-app-70g7.onrender.com/api/products");
-----------------------------------------------------------------------------------------------------
await axios.get("...") — sends a GET request to that URL and waits for the response. 
await is what makes an async function "pause."
That URL is an API endpoint on a deployed server that returns a list of products.
response is the full HTTP response (status code, headers, body, etc.).


    useEffect(() =>  {
        getProducts();
    }, [])
------------------------------------------------------------------------------------------------------
useEffect(() => { ... }, []) runs the inner function after the component renders.
The second argument [] is the dependency array. Because it's empty, this effect runs only once, 
right after the component first appears on the page.
Inside, it calls getProducts(), which fires off the API request.
The pattern "fetch data once when the component mounts" is the most common use of useEffect
-----------------------------------------------------------------------------------------------
    const [userId, setUserId] = useState(1);
    useEffect(() => {
        getProducts(userId);
    }, [userId]);   // re-runs whenever userId changes   
-----------------------------------------------------------------------------------------------
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("asc");
    useEffect(() => {
        getProducts({ category, sort });
    }, [category, sort]);   // re-runs if EITHER changes
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------



-----------------------------------------------------------------------------------------------
    return ( <div className="mt-5"> ... </div> )
----------------------------------------------------------------------
isLoading true?  ──yes──▶  show "Loading"
        │
        no
        ▼
products.length > 0?  ──yes──▶  loop and show each product.name
        │
        no
        ▼
show "There is no product"
---------------------------------------------------------------------- 



--------------------------------------------------------------
products.map((products) => (
    <div className="bg-red-50" key={products._id}>
        {products.name}
    </div>
))
---------------------------------------------------------------------------------------------------------------------
`products.map(...)` --> loops over the products array (your fetched list) and runs the arrow function once per item, 
producing a new array of JSX.
---------------------------------------------------------------------------------------------------------------------
`(products) => (...)` --> for each item, product is that one item (e.g. { _id, name, quantity, price, image }). 
---------------------------------------------------------------------------------------------------------------------
`=> ( ... )` --> form uses parentheses, meaning "return this JSX directly" (no return keyword needed).
---------------------------------------------------------------------------------------------------------------------
`<div className="bg-red-50"> ... </div>` --> a `<div>` styled with Tailwind's bg-red-50 (light red background). 
One div per product.
---------------------------------------------------------------------------------------------------------------------
`key={products._id}` --> a unique id React uses internally to track each list item. 
Using the real _id (not the array index) is the best practice — it stays correct 
even if items get reordered, added, or deleted.
`{product.name}` — injects the product's name field as text inside the div (e.g. "soap", "shampoo").
---------------------------------------------------------------------------------------------------------------------
"For each product in the list, render a light-red box showing its name."
---------------------------------------------------------------------------------------------------------------------





-----------------------------------------------------------------------------------------------

# Regular function:

function add(a, b) {
    return a + b;
}
-----------------------------------------------------------------------------------------------
# Arrow function equivalent:

const add = (a, b) => {
    return a + b;
};
-----------------------------------------------------------------------------------------------
# even shorter: 

const add = (a, b) => a + b;
-----------------------------------------------------------------------------------------------
## Common forms: 

# Zero parameters
const sayHi = () => console.log("Hi");

# One parameter — parentheses optional
const double = x => x * 2;

# Multiple parameters — parentheses required
const add = (a, b) => a + b;

# Multiple lines in the body — need curly braces + explicit return
const greet = (name) => {
    const message = "Hello, " + name;
    return message;
};
-----------------------------------------------------------------------------------------------



*/   