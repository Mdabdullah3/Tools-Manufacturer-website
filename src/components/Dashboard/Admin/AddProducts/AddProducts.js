import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const AddProducts = () => {
  const { register, reset, handleSubmit } = useForm();
  const imgStorageKey = "58d3c7355cf533547f2645e98915da5c";
  const [user] = useAuthState(auth);
  console.log(user)
  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const events = {
            userName: user.displayName,
            email: data.email,
            text: data.description,
            date: data.date,
            name: data.name,
            titleCode: data.status,
            img: img,
          };
          // send to your database
          fetch("https://ford-server.onrender.com/products", {
            method: "POST",
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(events),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("Gallery succesfully Added");
            });
          console.log(data)
        }
      });
    reset();
  };
  return (
    <section className="mt-6 p-6 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-center gap-6 mt-4 md:grid-cols-2">
          <div>
            <label className="font-mono text-secondary">Your Name</label>
            <input
              type="text"
              value={user?.displayName}
              placeholder="Enter Your Name.."
              className="block px-4 py-2 mt-5 bg-transparent w-full input font-mono text-md border-2 border-primary placeholder-secondary/70 text-secondary "
              {...register("userName")}
              required
            />
          </div>
          <div>
            <label className="font-mono text-secondary">Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name.."
              className="block px-4 py-2 mt-5 bg-transparent w-full input font-mono text-md border-2 border-primary placeholder-secondary/70 text-secondary "
              {...register("name")}
              required
            />
          </div>
          <div>
            <label className="text-secondary font-mono">Your Email</label>
            <input
              type="text"
              value={user?.email}
              placeholder="takeyourSmile@gmail.com"
              className="block px-4 py-2 mt-3 bg-transparent w-full input font-mono text-md border-2 border-primary placeholder-secondary/70 text-secondary "
              {...register("email")}
              required
            />
          </div>
          <div>
            <label className="text-secondary dark:text-gray-200">Price</label>
            <input
              type="text"
              placeholder='Enter Product Price'
              className="block px-4 py-2 mt-3 bg-transparent w-full input font-mono text-md border-2 border-primary placeholder-secondary/70 text-secondary "
              {...register("price")}
              required
            />
          </div>
          <div>
            <label className="text-secondary dark:text-gray-200">Minimum Order</label>
            <input
              type="text"
              placeholder='Minimum Order Quantity'
              className="block px-4 py-2 mt-3 bg-transparent w-full input font-mono text-md border-2 border-primary placeholder-secondary/70 text-secondary "
              {...register("minorder")}
              required
            />
          </div>
          <div>
            <label className="text-secondary dark:text-gray-200">Product Stock</label>
            <input
              type="text"
              placeholder='Enter Product Stock'
              className="block px-4 py-2 mt-3 bg-transparent w-full input font-mono ttext-md border-2 border-primary placeholder-secondary/70 text-secondary "
              {...register("stock")}
              required
            />
          </div>
          <div>
            <label className="text-secondary font-mono">Description</label>
            <textarea
              {...register("description")}
              required
              id="textarea"
              placeholder="Message..."
              className="block w-full font-mono h-36 p-4 mb-4 text-secondary rounded-xl resize-none border-2 border-primary px-4 py-2 mt-2 bg-transparent text-area"
            />
          </div>
          <div>
            <label className="block font-mono text-secondary">
              Upload Your Prouduct images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-primary border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-secondary"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex">
                  <label className="relative cursor-pointer border-2 border-primary rounded-md  px-3 py-2">
                    <span className="font-mono text-secondary">
                      Upload a file
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("image", {
                        required: {
                          value: true,
                          message: "Image is Required",
                        },
                      })}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="#_"
          className="relative mt-4 inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-secondary transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-primary group"
        >
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full"></span>
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg
              className="w-5 h-5 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg
              className="w-5 h-5 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <input
            type="submit"
            value="Submit"
            className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white font-mono"
          />
        </a>
      </form>
    </section>
  );
};

export default AddProducts;