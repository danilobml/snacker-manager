import { useForm } from 'react-hook-form'
import axios from 'axios';

import { useFetchData } from '@/hooks/useFetchData';
import { type Category } from '@/types/data.types';

interface FormData {
    name: string;
    image: string;
}

const API_URL = process.env.NEXT_PUBLIC_SNACKER_API_URL;

const CategoriesForm = () => {
    const { categories } = useFetchData();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const checkIfCategoryExists = (name: string) => {
        const category = categories.find((category: Category) => category.name === name);
        return !!category;
    }

    const createCategory = (data: FormData) => {
        const { name, image } = data;
        if (checkIfCategoryExists(name)) {
            alert('Category already exists!');
            return;
        }
        const newCategory = {
            id: String(categories.length),
            name,
            image
        }
        const config = { headers: { 'Content-Type': 'application/json' } }
        axios.post(`${API_URL}/categories`, newCategory, config)
            .then(response => {
                console.log(response);
                alert('Category created successfully!');
            })
            .catch(error => {
                console.log(error);
                alert('Error creating category');
            })
    }

    const onSubmit = (data: any) => {
        createCategory(data);
    }

    return (
        <div className='m-40 text-left w-96'>
            <h1 className='text-2xl font-bold text-center'>Add new category</h1>
            <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md' onSubmit={handleSubmit(onSubmit)}>
                <label className='block mt-3 mb-2 text-gray-700'>Name</label>
                <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="name" placeholder='Name of category'
                    {...register("name", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                />
                {errors?.name?.type === "required" && <p className='text-red-500'>Category name is required</p>}
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
                <button type='submit' className='w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit</button>
            </form>
        </div>
    )
}

export default CategoriesForm