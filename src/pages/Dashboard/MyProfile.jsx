import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-3 flex flex-col items-center justify-center h-screen">
      <img
        className="w-[300px] border-2 border-black"
        src={user?.photoURL}
        alt={user?.displayName}
      />
      <p className="text-lg font-semibold">Name: {user?.displayName}</p>
      <p className="text-lg font-semibold">Email: {user?.email}</p>
    </div>
  );
};

export default MyProfile;
