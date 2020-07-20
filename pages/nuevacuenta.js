import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput!) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
    }
  }
`;

export default function nuevacuenta() {
  const [Mensaje, setMensaje] = useState(null);
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    onSubmit: async (valores) => {
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre: valores.nombre,
              apellido: valores.apellido,
              email: valores.email,
              password: valores.password,
            },
          },
        });
        console.log(data);
      } catch (error) {
        setMensaje(error.message);

        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El Apellido es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "El password debe ser de al menos 6 caracteres"),
    }),
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{Mensaje}</p>
      </div>
    );
  };

  return (
    <>
      {Mensaje && mostrarMensaje()}

      <Layout>
        <h1 className="text-center text-6xl">Nueva Cuenta</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Introduce tu nombre"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.nombre && formik.touched.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  htmlFor="apellido"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Introduce tu apellido"
                  id="apellido"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.apellido && formik.touched.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Introduce tu email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Introduce tu password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {formik.errors.password && formik.touched.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                value="Registrarse"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
