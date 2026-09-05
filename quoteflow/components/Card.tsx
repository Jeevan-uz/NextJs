"use client";

import Image from "next/image";
import Link from "next/link";

interface props {
  title: string;
  slug: string;
  image: string;
  price: string;
}

const Card = ({ title, slug, image, price }: props) => {
  return (
    <div className="mt-5 ">
      <Link href={`/services/${slug}`} id="card">
        <Image
          src={image}
          alt={title}
          width={410}
          height={300}
          className="poster "
          priority
        ></Image>
      </Link>

      <div>
        <p>{title}</p>
      </div>
      <div>
        <p>{price}</p>
      </div>

      <div>
        <button type="submit">Add to Quote</button>
      </div>
    </div>
  );
};

export default Card;
