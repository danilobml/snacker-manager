import { useForm } from 'react-hook-form'

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
    gender: string;
    dob: string;
}

const RegistrationForm = () => {
    const { register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data));
    }

  return (
    <>
    <div className='m-40 text-left w-96'>
        <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md' onSubmit={handleSubmit(onSubmit)}>
            <label className='block mt-3 mb-2 text-gray-700'>First Name</label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="firstName" placeholder='John'
            {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i
            })}
            /> 
            {errors?.firstName?.type === "required" && <p className='text-red-500'>First name is required</p>}
            {errors?.firstName?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}

            <label className='block mt-3 mb-2 text-gray-700'>Last Name</label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="text" id="lastName" placeholder='Doe'
            {...register("lastName", {
                pattern: /^[A-Za-z]+$/i
            })}
            />
            {errors?.lastName?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}
            <label className='block mt-3 mb-2 text-gray-700'>Email</label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="email" id="email" placeholder='example@gmail.com'
            {...register("email", {
                 pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i 
            })}
            
            />
            {errors?.email?.type === "pattern" && (<p className='text-red-500'>Please write correct email address</p>)}
            <label className='block mt-3 mb-2 text-gray-700'>Password</label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="password" id="password" placeholder='********'
            {...register("password", {
                 minLength: 8,
                 required: true 
            })}
            />
            {errors?.password?.type === "minLength" && (<p className='text-red-500'>Your password must be larger then 8 characters</p>)}
            {errors?.password?.type === "required" && (<p className='text-red-500'>Password is required</p>)}
            <label className='block mt-3 mb-2 text-gray-700'>Re type password</label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="password" id="repassword" placeholder='********'
            {...register("repassword", {
                 minLength: 8,
                 required: true,
                 validate: (val) =>{
                    if(watch('password') !== val) {
                        return `${alert("Password does not match!")}`
                    }
                 }
            })}
            
            />
            {errors?.repassword?.type === "minLength" && (<p className='text-red-500'>Your password must be larger then 8 characters</p>)}
            {errors?.repassword?.type === "required" && (<p className='text-red-500'>Re type your password.</p>)}

            <label className='block mt-3 mb-2 text-gray-700'>Select Gender</label>
            <select id="gender" className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none form-select textgray-700 focus:outline-none focus:shadow-outline'
            {...register("gender")}
            >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
            </select>


            <label className='block mt-3 mb-2 text-gray-700'>Date of birth</label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none textgray-700 focus:outline-none focus:shadow-outline' type="date" id="dob"
            {...register("dob", {
                required: true,
            })}
            /> 
            {errors?.firstName?.type === "required" && <p className='text-red-500'>Date of birth is required</p>}
               
            {errors?.firstName?.type === "required" && <p className='text-red-500'>Date of birth is required</p>}
            <button type='submit' className='w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default RegistrationForm