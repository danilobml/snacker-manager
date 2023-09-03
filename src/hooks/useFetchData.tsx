import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SNACKER_API_URL 

export function useFetchData() {
    const [categories, setCategories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [featured, setFeatured] = useState([]);
    
    function getCategories() {
        axios.get(`${API_URL}/categories`)
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.log('Error - failed fetching categories:', error);
            });
    }

    function getRestaurants() {
        axios.get(`${API_URL}/restaurants`)
            .then(response => {
                setRestaurants(response.data.restaurants);
            })
            .catch(error => {
                console.log('Error - failed fetching restaurants:', error);
            });
    }

    function getDishes() {
        axios.get(`${API_URL}/dishes`)
            .then(response => {
                setDishes(response.data.dishes);
            })
            .catch(error => {
                console.log('Error - failed fetching dishes:', error);
            });
    }

    function getFeatured() {
        axios.get(`${API_URL}/featured`)
            .then(response => {
                setFeatured(response.data.featured);
            })
            .catch(error => {
                console.log('Error - failed fetching featured:', error);
            });
    }

    useEffect(() => {
        getCategories();
        getRestaurants();
        getDishes();
        getFeatured();
    }, []);
    
    return { categories, restaurants, dishes, featured };
}
