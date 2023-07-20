const Avater = ({ src }) => {
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
        src={src}
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
