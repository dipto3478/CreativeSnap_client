import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-hot-toast";

const AddClasses = () => {
  const { user } = useAuth();
  const [axiosSource] = useAxios();

  const { register, handleSubmit, reset } = useForm(); // initialize the hook
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMG_API
  }`;
  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("image", data.photo[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;
          const { name, email, price, seats, title } = data;
          const AllData = {
            instructor_name: name,
            email,
            price: parseFloat(price),
            Available_seats: parseFloat(seats),
            image: imgUrl,
            instructor_img: user?.photoURL,
            title,
          };
          axiosSource.post("/classes", AllData).then((data) => {
            console.log(data);
            toast.success("successfully added class");
            reset();
          });
        }
      });
  };

  return (
    <section className=" flex flex-col items-center justify-center h-screen  px-5">
      <h2 className="text-3xl text-center font-bold">Add Classes</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  gap-5">
          <div className="w-full ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Name
            </label>
            <input
              defaultValue={user?.displayName}
              {...register("name", { required: true })}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your name"
              id="name"
            ></input>
          </div>
          <div className="w-full ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              email
            </label>
            <input
              defaultValue={user?.email}
              {...register("email", { required: true })}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Enter your email"
              id="email"
            ></input>
          </div>
        </div>
        <div className="flex  gap-5">
          <div className="w-full ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Price
            </label>
            <input
              {...register("price", { required: true })}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              placeholder="Enter your Price"
              id="price"
            ></input>
          </div>
          <div className="w-full ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Available seats
            </label>
            <input
              {...register("seats", { required: true })}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              placeholder="Available seats"
              id="name"
            ></input>
          </div>
        </div>
        <div className="flex  gap-5">
          <div className="w-full ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Photo
            </label>
            <input
              {...register("photo", { required: true })}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="file"
              id="file"
            ></input>
          </div>
          <div className="w-full ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="title"
              placeholder="Enter title"
            ></input>
          </div>
        </div>
        <div className="mt-5">
          <input
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
            type="submit"
            value="Add Class"
          />
        </div>
      </form>
    </section>
  );
};

export default AddClasses;
