import './scss/app.scss'
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import {Route, Routes} from "react-router-dom";
import StaticLayout from "./components/StaticLayout";
import React, {Suspense} from "react";

const CartPage = React.lazy(() => import(/*webpackChunkName: "CartPage"*/'./pages/CartPage'));
const ItemPage = React.lazy(() => import(/*webpackChunkName: "ItemPage"*/'./pages/ItemPage/ItemPage'));

function App() {
    return (
        <Routes>
            <Route path="/" element={<StaticLayout/>}>
                <Route path='apple-store' element={<MainPage/>}/>
                <Route path='apple-store/cart' element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <CartPage/>
                    </Suspense>
                }/>
                <Route path='apple-store/item/:id' element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <ItemPage/>
                    </Suspense>
                }/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
