import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Page404(props) {
  return (
    <div>
      <div>
        <h1>Page not found</h1>
        <p>
          <Link to={"/"}>
            {/* <button type="button" class="btn btn-success">
              Go Back
            </button> */}
            <Button href="#text-buttons" color="primary">
              Go Back
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
