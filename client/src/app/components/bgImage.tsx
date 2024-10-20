import Image from "next/image";

const BgImage = ({ color }: { color: "blue" | "pink" | "green" }) => {
  return (
    <>
      <Image
        src={`/${color}-bg.png`}
        alt="bg"
        fill
        className="fixed inset-0 -z-50"
      />
    </>
  );
};

export default BgImage;
