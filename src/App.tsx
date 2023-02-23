import './scss/app.scss'
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import {Route, Routes} from "react-router-dom";
import CartPage from "./pages/CartPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import StaticLayout from "./components/StaticLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<StaticLayout/>}>
                <Route path='apple-store' element={<MainPage/>}/>
                <Route path='apple-store/cart' element={<CartPage/>}/>
                <Route path='apple-store/item/:id' element={<ItemPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
