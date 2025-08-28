'use client'
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {

    const params = useParams<{ category: string }>();

    return (
        <Link href={`/order/${category.slug}`} className={`${category.slug === params.category ? 'bg-amber-400 text-white' : 'hover:bg-amber-200'} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>
            <div className="w-16 h-16 relative">
                <Image src={`/icon_${category.slug}.svg`} alt={`${category.name} Image`} fill />
            </div>
            <p className="text-xl font-bold">{category.name}</p>
        </Link>
    )
}
