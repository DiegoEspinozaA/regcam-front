import { Link, useLocation } from "react-router-dom";
import {splitCamelCase} from "../funciones";
export default function Bread() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(crumb => crumb !== '');
  if (pathSegments.length >= 3 && pathSegments[pathSegments.length - 2] === "editarRegistro") {
    pathSegments.pop();
  }

  if(pathSegments.length >= 3 && pathSegments[pathSegments.length - 2] === "camara") {
    pathSegments[pathSegments.length - 2]  = 'registrosCamara ' +pathSegments[2]
    pathSegments.pop();
  }
  const crumbs = pathSegments.map((crumb, index) => {
    const isLastCrumb = index === pathSegments.length - 1;
    const linkTo = isLastCrumb ? null : `/${pathSegments.slice(0, index + 1).join('/')}`;

    return (
      <li key={crumb}>
        {isLastCrumb ? (
          <span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 cursor-pointer">{splitCamelCase(crumb).join(' ')}</span>
        ) : (
          <div className="flex items-center text-blue-gray-900 antialiased font-sans text-md font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
          <Link to={linkTo} className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-normal opacity-80 transition-all hover:text-blue-600 hover:opacity-100">{splitCamelCase(crumb).join(' ')}</Link>
          <span class="text-blue-gray-500 text-md antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
          </div>
        )}
      </li>
    );
  });

  return (
    <div className="">
    <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all capitalize">
        {crumbs}
      </ol>
    </div>
  );
}
