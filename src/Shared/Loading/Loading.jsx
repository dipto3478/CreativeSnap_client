import { MagnifyingGlass } from "react-loader-spinner";

const Loading = () => {
  return (
    <section className="flex items-center justify-center h-[80vh]">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#ffffff"
        color="#000000"
      />
    </section>
  );
};

export default Loading;
