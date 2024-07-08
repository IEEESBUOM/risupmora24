
'use client'
import react,{ useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm,SubmitHandler } from "react-hook-form";
import { IoMdEyeOff,IoMdEye } from "react-icons/io";


export default function Page() {
  type Inputs = {
        username: string,
        email: string,
        password: string,
      };
      const [errorMessage, setErrorMessage] = useState('');
      const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
      const onSubmit: SubmitHandler<Inputs> = data => {
        //sign up logic here
      }
      const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid font-poppins place-self-center  " >
    <h1 className=" text-center mb-6 font-medium text-neutral-800 text-3xl ">
     Register
    </h1>
     <div className=" mb-4">
      <label htmlFor="email" className="font-medium block mb-1">
         Name
       </label>
      <input
        {...register("username")}
        type="username"
        name="username"
        placeholder="Enter your username"
        required
        id="username"
        className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
       
      style={{
        background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
      }}
      />
    </div>
    <div className=" mb-4">
      <label htmlFor="email" className="font-medium block mb-1">
        Email
      </label>
      <input
        {...register("email")}
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        id="email"
        className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
       
      style={{
        background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
      }}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="font-medium block mb-1">
        Password
      </label>
      <div className="relative">
      <input
        {...register("password")}
        type={passwordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        // required
        id="password"
        className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
       
      style={{
        background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
      }}
      />
      <div
            className="text-xs font-semibold cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <IoMdEye size={26}/>: <IoMdEyeOff size={26} />}
          </div>
      </div>
    </div>
    {errorMessage && (
      <div className="mb-4 text-red-500">
        <p>{errorMessage}</p>
      </div>
    )}
    
    <div className="mt-4  grid justify-center">
      <Button variant={"auth"}>
        Sign Up</Button>
    </div>
    <div className="text-xs flex gap-1 mt-8 justify-center ">
    <div className=" content-center">
    Already have an Account?
    </div>
    <Link href="signin" className="text-sm text-blue-400">
    Sign In
    </Link>
    </div>
  </form>)
  
}



// 'use client'
// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useForm,SubmitHandler } from "react-hook-form";
// import { IoMdEyeOff,IoMdEye } from "react-icons/io";

// const Page = () => {
//   type Inputs = {
//     username: string,
//     email: string,
//     passsword: string,
//   };
//   const [errorMessage, setErrorMessage] = useState('');
//   const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = data => {
//     //sign up logic here
//   }
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   return (
//   <form onSubmit={handleSubmit(onSubmit)} className="grid font-poppins place-self-center  " >
//     <h1 className=" text-center mb-6 font-medium text-neutral-800 text-3xl ">
//     Register
//     </h1>
//     <div className=" mb-4">
//       <label htmlFor="email" className="font-medium block mb-1">
//         Name
//       </label>
//       <input
//         {...register("username")}
//         type="username"
//         name="username"
//         placeholder="Enter your username"
//         required
//         id="username"
//         className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
       
//       style={{
//         background: `linear-gradient(white, white) padding-box, 
//                      linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
//       }}
//       />
//     </div>
//     <div className=" mb-4">
//       <label htmlFor="email" className="font-medium block mb-1">
//         Email
//       </label>
//       <input
//         {...register("email")}
//         type="email"
//         name="email"
//         placeholder="Enter your email"
//         required
//         id="email"
//         className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
       
//       style={{
//         background: `linear-gradient(white, white) padding-box, 
//                      linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
//       }}
//       />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="password" className="font-medium block mb-1">
//         Password
//       </label>
//       <div className="relative">
//       <input
//         {...register("passsword")}
//         type={passwordVisible ? "text" : "password"}
//         name="passsword"
//         placeholder="Enter your passsword"
//         // required
//         id="passsword"
//         className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
       
//       style={{
//         background: `linear-gradient(white, white) padding-box, 
//                      linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
//       }}
//       />
//       <div
//             className="text-xs font-semibold cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
//             onClick={() => setPasswordVisible(!passwordVisible)}
//           >
//             {passwordVisible ? <IoMdEye size={26}/>: <IoMdEyeOff size={26} />}
//           </div>
//       </div>
//     </div>
//     {errorMessage && (
//       <div className="mb-4 text-red-500">
//         <p>{errorMessage}</p>
//       </div>
//     )}
    
//     <div className="mt-4  grid justify-center">
//       <Button variant={"auth"}>
//         Sign Up</Button>
//     </div>
//     <div className="text-xs flex gap-1 mt-8 justify-center ">
//     <div className=" content-center">
//     Already have an Account?
//     </div>
//     <Link href="signin" className="text-sm text-blue-400">
//     Sign In
//     </Link>
//     </div>
//   </form>);
// };

// export default Page;
