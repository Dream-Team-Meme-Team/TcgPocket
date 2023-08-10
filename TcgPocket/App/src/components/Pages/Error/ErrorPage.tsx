import { useRouteError } from "react-router-dom";

export function ErrorPage(): React.ReactElement {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            An unexpected error has occurred
        </div>
    )
}