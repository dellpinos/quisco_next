import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    });

    return products;
}

export default async function page({ params }: { params: { category: string } }) {
    const { category } = await params;
    const products = await getProducts(category);

    return (
        <>
            <Heading>
                Elige y personaliza tu pedido
            </Heading>
            <div className="grid grid-cols1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
                {products.map(product => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </>
    )
}
