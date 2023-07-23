import React from "react";

interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div
      className='avaterCon'
      style={{
        width: "35px",
        height: "35px",
      }}
      role='button'
    >
      <img
        src={src}
        alt='avatar'
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Avatar;
