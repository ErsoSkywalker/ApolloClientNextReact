import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-800 p-3" : "p-3"}>
          <Link href="/">
            <a className="text-white mb-3 block">Clientes</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/Pedidos" ? "bg-blue-800 p-3" : "p-3"}
        >
          <Link href="/Pedidos">
            <a className="text-white mb-3 block">Pedidos</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/Productos" ? "bg-blue-800 p-3" : "p-3"
          }
        >
          <Link href="/Productos">
            <a className="text-white mb-3 block">Productos</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/Nosotros" ? "bg-blue-800 p-3" : "p-3"
          }
        >
          <Link href="/Nosotros">
            <a className="text-white mb-3 block">Nosotros</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
}
