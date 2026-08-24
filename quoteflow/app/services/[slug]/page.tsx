interface Pageprops {
  params: Promise<{ slug: string }>;
}

export const Service = async ({ params }: Pageprops) => {
  const { slug } = await params;

  return <div>{slug} service costs</div>;
};

export default Service;
