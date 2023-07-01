import avater from "../assets/avater.jpg";
const Avater = () => {
  return (
    <div
      style={{
        width: "35px",
        height: "35px",
      }}
      role='button'
      className='avaterCon'
    >
      <img
        src={avater}
        alt='avater'
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Avater;
