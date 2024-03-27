interface CharImageProps {
  imageUrl: string;
  altText: string;
}

const CharImage = ({ imageUrl, altText }: CharImageProps) => {
  return (
    <img
      src={imageUrl}
      alt={altText}
      className="w-full grow shrink-0 self-center max-w-[160px] aspect- items-center"
    />
  );
};

export default CharImage;
