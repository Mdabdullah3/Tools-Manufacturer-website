import React from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const UpdateProfile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const imgStorageKey = "58d3c7355cf533547f2645e98915da5c";
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
          const updateData = {
            img: img,
            name: data.name,
            phone: data.phone,
            country: data.country,
            address: data.address,
            describe: data.describe,
            education: data.education,
          };
          fetch(`https://ford-server.onrender.com/user/update/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Profile Updated")
                navigate("/yourProfile");
              }
            });
        }
      })
  }

  return (
    <div className="flex justify-center items-center py-5">
      <div className="card lg:w-[40%] w-fit  drop-shadow-2xl">
        <div className="card-body">
          <h2 className="text-center my-10 text-secondary font-medium  text-4xl">
            Update Your Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full text-secondary">
              <div className="flex">
                <div className="mr-14">
                  <label className="label">
                    <span className="label-text text-base text-secondary font-medium">
                      Name
                    </span>
                  </label>
                  <input
                    type="name"
                    placeholder="Enter Your Name"
                    className="input input-bordered input-primary border-2 border-primary w-full"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="">
                  <label className="label">
                    <span className="label-text text-base text-secondary font-medium">
                      Education
                    </span>
                  </label>
                  <input
                    type="name"
                    placeholder="Enter Your Education"
                    className="input input-bordered input-primary border-2 border-primary w-full"
                    {...register("education", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text text-secondary text-base font-medium">
                    Phone Number
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Your Phone Number"
                  className="input input-bordered input-primary border-2 border-primary w-full"
                  {...register("phone", {
                    required: true,
                  })}
                />
              </div>
              <label className="label">
                <span className="label-text text-secondary text-base font-medium">
                  Your Country
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Country"
                className="input input-bordered input-primary border-2 border-primary w-full"
                {...register("country", {
                  required: true,
                })}
              />
              <label className="label">
                <span className="label-text text-secondary text-base font-medium">
                  Address
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Address"
                className="input input-bordered input-primary border-2 border-primary w-full"
                {...register("address", {
                  required: true,
                })}
              />
              <div>
                <label className="block font-mono text-secondary my-2">
                  Upload Your Profile img
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
                      <label className="relative cursor-pointer border-2 border-dotted border-primary rounded-md  px-3 py-2">
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
              <label className="label">
                <span className="label-text text-secondary text-base  font-medium">
                  Describe you
                </span>
              </label>
              <textarea
                type="text"
                name="Describe"
                className="textarea textarea-primary border-2 border-primary"
                placeholder="Enter Your Describe"
                {...register("describe", {
                  required: true,
                })}
              ></textarea>
            </div>
            <input
              className="btn mt-8 text-secondary text-xl w-full bg-primary"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
