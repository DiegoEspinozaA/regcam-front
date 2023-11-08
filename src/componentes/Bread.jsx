import { Link, useLocation } from "react-router-dom";
import { splitCamelCase } from "../funciones";
import {
  Typography,
} from "@material-tailwind/react";
export default function Bread() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(crumb => crumb !== '');

  const crumbs = pathSegments.map((crumb, index) => {
    const isLastCrumb = index === pathSegments.length - 1;
    const anterior = pathSegments[index - 1];
    const actual = pathSegments[index];
    if (anterior === 'camara') {
      if (!isNaN(parseInt(actual))) {
        crumb = 'camara ' + actual
      }
    }

    if (anterior === 'historial') {
      if (!isNaN(parseInt(actual))) {
        crumb = 'historial ' + actual
      }
    }
    const linkTo = isLastCrumb ? null : `/${pathSegments.slice(0, index + 1).join('/')}`;
    return (
      <li key={crumb}>
        {isLastCrumb ? (
          <Typography
            variant="small"
            color="blue-gray"
            className="text-sm font-semibold"
          >
            {splitCamelCase(crumb).join(' ')}
          </Typography>
        ) : (
          <div className="flex items-center text-blue-gray-900 antialiased font-sans text-md font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
            <Link to={linkTo}>
              <Typography
                variant="small"
                className="font-normal  hover:text-blue-500 "
              >

                {splitCamelCase(crumb).join(' ') === 'camara'
                  ?
                  '' : <>
                    {splitCamelCase(crumb).join(' ') === 'historial'
                      ?
                      '' : <>
                        {splitCamelCase(crumb).join(' ')}
                        <span class="text-blue-gray-500 text-md antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                      </>
                    }
                  </>
                }





              </Typography>
            </Link>
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
