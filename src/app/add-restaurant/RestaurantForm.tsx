import { useForm } from 'react-hook-form'
import axios from 'axios';

import { useFetchData } from '@/hooks/useFetchData';
import { type Restaurant } from '@/types/data.types';
import { getLatLng } from '@/utils/getLatLng';

const API_URL = process.env.NEXT_PUBLIC_SNACKER_API_URL;

interface FormData {
    name: string;
    image: string;
    categoryId: string;
    address: string;
    description: string;
    deliveryFee: number;
}

const RestaurantForm = () => {
    const { categories, restaurants } = useFetchData();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const checkIfRestaurantExists = (name: string) => {
        const restaurant = restaurants.find((restaurant: Restaurant) => restaurant.name === name);
        return !!restaurant;
    }

    const createRestaurant = async (data: FormData) => {
        const { name, image, categoryId, address, description, deliveryFee } = data;
        if (checkIfRestaurantExists(name)) {
            alert('Restaurant already exists!');
            return;
        }
        const latLng = await getLatLng(address);
        const { lat, lng } = latLng!;
        const newRestaurant = {
            id: String(restaurants.length),
            name,
            image,
            categoryId,
            address,
            description,
            deliveryFee,
            lat: String(lat),
            lng: String(lng),
        }
        const config = { headers: { 'Content-Type': 'application/json' } }
        axios.post(`${API_URL}/restaurants`, newRestaurant, config)
            .then(response => {
                console.log(response);
                alert('Restaurant created successfully!');
            })
            .catch(error => {
                console.log(error);
                alert('Error creating restaurant');
            })
    }

    const onSubmit = (data: any) => {
        createRestaurant(data);
    }

    return (
        <div className='m-40 text-left w-100'>
            <h1 className='text-2xl font-bold text-center'>Register your restaurant</h1>
            <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md' onSubmit={handleSubmit(onSubmit)}>
                <p className='text-gray-700'>Select a category for your restaurant below. If the appropriate one isn't on the list, first <span className='text-blue-500'><a href="#">create one here</a></span>, then come back to create a restaurant</p>
                <select className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' id='category' {...register("categoryId", { 
                    required: true,
                    pattern: /^[0-9]+$/i
                    })}>
                    <option value=''>Select a category</option>
                    {categories.length > 0 && categories.map((category: any) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors?.categoryId?.type === "required" && <p className='text-red-500'>Please choose a category.</p>}
                {errors?.categoryId?.type === "pattern" && (<p className='text-red-500'>Please choose a category.</p>)}   
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='name'>Name</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="name" placeholder='Name of the restaurant'
                    {...register("name", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[a-z\d\-_\s]+$/i
                    })}
                />
                {errors?.name?.type === "required" && <p className='text-red-500'>Restaurant name is required</p>}
                {errors?.name?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='image'>Image URL</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="image" placeholder='http...'
                    {...register("image", {
                        required: true,
                        pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i
                    })}
                />
                {errors?.image?.type === "required" && <p className='text-red-500'>Image URL is required</p>}
                {errors?.image?.type === "pattern" && (<p className='text-red-500'>Insert valid URL for an image</p>)}
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='address'>Address</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="address" placeholder='Address of the restaurant'
                    {...register("address", {
                        required: true,
                    })}
                />
                {errors?.name?.type === "required" && <p className='text-red-500'>Restaurant address is required</p>}
                {errors?.name?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='descritpion'>Description</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="textarea" id="description" placeholder='Describe the restaurant'
                    {...register("description", {
                        required: true,
                        maxLength: 255,
                    })}
                />
                {errors?.description?.type === "required" && <p className='text-red-500'>A description is required</p>}
                {errors?.description?.type === "maxLength" && (<p className='text-red-500'>The description can be max. 255 characters long</p>)}
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='descritpion'>Delivery Fee (in €)</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="number" min={0} step="0.01" id="deliveryFee" placeholder='Does the restaurant charge a delivery fee? (in Euros)'
                    {...register("deliveryFee", {
                        min: 0,
                    })}
                />
                {errors?.deliveryFee?.type === "min" && (<p className='text-red-500'>The delivery fee can't be negative</p>)}
                <button type='submit' className='w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit</button>
            </form>
        </div>
    )
}

export default RestaurantForm