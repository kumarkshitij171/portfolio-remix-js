import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import HomePage from "~/components/HomePage";
import Navbar from "~/components/Navbar";
import { PortfolioData } from "~/types/portfolio";
import { loadData } from "~/utils/loadData.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Kshitij Portfoilio" },
    { name: "description", content: "Portfolio of Kshitij" },
  ];
};

export const loader = async () => {
  try {
    const data = await loadData();
    return json<{ data: PortfolioData }>({ data });
  } catch (error) {
    console.error("error in dashboard loader: ",error)
    return json({});
  }
};

export default function Index() {
  const portfolioData = useLoaderData<{ data: PortfolioData }>();

  if(!portfolioData.data){
    return <div>Loading...</div>
  }

  return (
    <div className="bg-[#05051b] text-white">
      <Navbar />
      <HomePage data={portfolioData.data} />
    </div>
  );
}

