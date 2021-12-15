import ReactLoading from "react-loading";

function Loader({ show }: { show: boolean }) {
  if (show) {
    return (
      <div className="flex justify-center mt-2">
        <ReactLoading
          type="spinningBubbles"
          color="#B5FF18"
          height="50px"
          width="50px"
        />
      </div>
    );
  } else {
    return (null);
  }
}

export default Loader