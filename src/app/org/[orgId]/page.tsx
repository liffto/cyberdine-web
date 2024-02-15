import ProductDisplay from "@/component/menu/products_display";

export default async function OrgProductsPage({params}:{params:{orgId:string}}){
    const response = await fetch(`${process.env.NODE_ENV == "development"?"http://localhost:3000":"https://lt-menu.vercel.app"}/api/org/${params.orgId}/menu`);
    const json = await response.json();
    console.log(json,json.data);
    
    return (
        <div className="min-h-screen bg-black">
            <ProductDisplay menu={json.data} />
        </div>
    )
}