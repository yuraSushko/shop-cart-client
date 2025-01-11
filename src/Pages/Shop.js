import axios from "axios";
import {API_ITEM_LIST_URL, CATALOG_TABLE_COLUMNS, ITEM_LIST_LIMIT} from "../Utils/Constants";
import {useEffect, useState} from "react";
import ExpenseItem from "./ExpenseItem";
import './Shop.css'

export default function Shop() {
    const [catalog, setCatalog] = useState(null)
    const [filteredCatalog, setFilteredCatalog] = useState(null)
    const canChangeAmount = true
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    const getItemList = async () => {
        try {
            const response = await axios.get(API_ITEM_LIST_URL, {
                params: {
                    limit: ITEM_LIST_LIMIT
                },
            });
            setCatalog(response.data.products)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getItemList()
    }, [])

    useEffect(() => {
        handleFilter()
    }, [catalog, minPrice, maxPrice])


    const handleFilter = () => {
        if (catalog) {
            const filteredData =
                catalog.filter((item) => (
                        (minPrice === null || minPrice === undefined || minPrice === '' || item.price >= minPrice) &&
                        (maxPrice === null || maxPrice === undefined || maxPrice === '' || item.price <= maxPrice)
                    )
                )
            setFilteredCatalog(filteredData)
        }
    }

    return (
        <div className="shop">
            <div className={" d-flex justify-content-center position-fixed  search-bar"}>
                <div className="badge rounded-pill text-bg-light border resize-badge">
                <label className={""}> Minimum Price: </label>
                <input type="number" value={minPrice}
                       onChange={event => setMinPrice(event.target.value)}/>
                </div>
                <div className="badge rounded-pill text-bg-light resize-badge">
                <label> Maximum Price: </label>
                <input type="number" value={maxPrice}
                       onChange={event => setMaxPrice(event.target.value)}/>
                </div>
            </div>

            <div className="container">
                <div className="row text-center body">
                    {filteredCatalog && (
                        filteredCatalog.map((item) => {
                            return (
                                <div className="expenses col-md-3 my-3">
                                    {<ExpenseItem id={item.id} name={item.title} img={item.image} price={item.price}
                                                  canChangeAmount={canChangeAmount}/>}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

        </div>
    )
}



