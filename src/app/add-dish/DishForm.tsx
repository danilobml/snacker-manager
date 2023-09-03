import { useForm } from 'react-hook-form'
import axios from 'axios';

import { useFetchData } from '@/hooks/useFetchData';
import { type Dish } from '@/types/data.types';

interface FormData {
    name: string;
    image: string;
    description: string;
    price: number;
    restaurantId: string;
}

const API_URL = process.env.NEXT_PUBLIC_SNACKER_API_URL;

const CategoriesForm = () => {
    const { dishes, restaurants } = useFetchData();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const checkIfDishExists = (name: string, restaurantId: string): boolean => {
        const dish = dishes.find((dish: Dish) => dish.name === name && dish.restaurantId === restaurantId);
        return !!dish;
    }

    const createDish = (data: FormData) => {
        const { name, image, description, price, restaurantId } = data;
        if (checkIfDishExists(name, restaurantId)) {
            alert('Dish already exists!');
            return;
        }
        const newDish = {
            id: String(dishes.length),
            name,
            image,
            description,
            price,
            restaurantId
        }
        const config = { headers: { 'Content-Type': 'application/json' } }
        axios.post(`${API_URL}/dishes`, newDish, config)
            .then(response => {
                console.log(response);
                alert('Dish/product created successfully!');
            })
            .catch(error => {
                console.log(error);
                alert('Error creating dish/product');
            })
    }

    const onSubmit = (data: any) => {
        createDish(data);
    }

    return (
        <div className='m-40 text-left w-96'>
            <h1 className='text-2xl font-bold text-center'>Add new dish/product</h1>
            <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md' onSubmit={handleSubmit(onSubmit)}>
            <p className='text-gray-700'>Select the restaurant below:</p>
                <select className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' id='category' {...register("restaurantId", { 
                    required: true,
                    pattern: /^[0-9]+$/i
                    })}>
                    <option value=''>Select a restaurant</option>
                    {restaurants.length > 0 && restaurants.map((restaurant: any) => (
                        <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                    ))}
                </select>
                {errors?.restaurantId?.type === "required" && <p className='text-red-500'>Please choose a restaurant.</p>}
                {errors?.restaurantId?.type === "pattern" && (<p className='text-red-500'>Please choose a restaurant.</p>)}   
                <label className='block mt-3 mb-2 text-gray-700'>Name</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="name" placeholder='Name of the dish/product'
                    {...register("name", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                />
                {errors?.name?.type === "required" && <p className='text-red-500'>Dish name is required</p>}
                {errors?.name?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}
                {/* TODO: Add image upload to S3 */}
                <label className='block mt-3 mb-2 text-gray-700'>Image URL</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="image" placeholder='http...'
                    {...register("image", {
                        required: true,
                        pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i
                    })}
                />
                {errors?.image?.type === "required" && <p className='text-red-500'>Image URL is required</p>}
                {errors?.image?.type === "pattern" && (<p className='text-red-500'>Insert valid URL for an image</p>)}
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='descritpion'>Description</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="textarea" id="description" placeholder='Describe the dish/product'
                    {...register("description", {
                        required: true,
                        maxLength: 255,
                    })}
                />
                {errors?.description?.type === "required" && <p className='text-red-500'>A description is required</p>}
                {errors?.description?.type === "maxLength" && (<p className='text-red-500'>The description can be max. 255 characters long</p>)}
                <label className='block mt-3 mb-2 text-gray-700' htmlFor='price'>Price (in €)</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="number" min={0} step="0.01" id="price" placeholder='Price (in Euros)'
                    {...register("price", {
                        required: true,
                        min: 0,
                    })}
                />
                {errors?.price?.type === "required" && <p className='text-red-500'>A price is required</p>}
                {errors?.deliveryFee?.type === "min" && (<p className='text-red-500'>The price can't be negative</p>)}
                <button type='submit' className='w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit</button>
            </form>
        </div>
    )
}

export default CategoriesForm