
import ProductDisplay from "@/component/menu/products_display";
import Topbar from "@/component/menu/topbar";


export default  async function OrgProductsPage({params}:{params:{restId:string}}){
    const response = await fetch(`${process.env.NODE_ENV == "development"?"http://localhost:3000":"https://lt-menu.vercel.app"}/api/rest/${params.restId}/detail`);
    const json = await response.json();
    console.log(json,json.data);
    
    return (
        <div className="">
            <Topbar data={json.data}/>
            <ProductDisplay restId={params.restId} />
        </div>
    )
}