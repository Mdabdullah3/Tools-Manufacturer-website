import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const User = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
    const url = 'https://ford-server.onrender.com/user';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setUser(data)
      })
  }, [])

  console.log(user)

  const handleDelete = (id) => {
    const proced = window.confirm("Are Your Sure Delete This User");
    if (proced) {
      const url = `https://ford-server.onrender.com/user/${id}`;

      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {

          const reamingData = user.filter((user) => user._id !== id);
          setUser(reamingData);
          console.log('yes');

          toast.success("Succesfully Delete User");
        });
    }
  };

  return (
    <section className="pt-4 mt-20">
      <div className="w-8/12 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto rounded-md">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-primary/40 text-center font-mono ">
                    <th
                      className="
                               w-1/6
                               min-w-[160px]
                               text-lg
                               font-semibold
                               text-secondary
                               py-4
                               lg:py-4
                               px-3
                               lg:px-4
                               border-l border-transparent
                               font-mono
                               "
                    >
                      Name
                    </th>
                    <th
                      className="
                               w-1/6
                               min-w-[160px]
                               text-lg
                               font-semibold
                               text-secondary
                               py-4
                               lg:py-4
                               px-3
                               lg:px-4
                               font-mono
                               "
                    >
                      Email
                    </th>
                    <th
                      className="
                               w-1/6
                               min-w-[160px]
                               text-lg
                               font-semibold
                               text-secondary
                               py-4
                               lg:py-4
                               px-3
                               lg:px-4
                               "
                    >
                      Delete User
                    </th>
                  </tr>
                </thead>
                {user.map((item) => (
                  <tbody>
                    <tr className="font-mono">
                      <td
                        className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 bg-transparent
                               border-b border-l border-primary
                               "
                      >
                        {item.name}
                      </td>
                      <td
                        className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 bg-transparent
                               border-b border-primary
                               "
                      >
                        {item.email}
                      </td>
                      <td
                        onClick={() => handleDelete(item._id)}
                        className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2
                               bg-transparent
                               border-b border-r border-primary
                               "
                      >
                        <span
                          className="
                                   border-primary
                                  py-2
                                  px-2
                                  text-primary
                                  inline-block
                                  rounded
                                  hover:bg-primary hover:text-secondary
                                  "
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
