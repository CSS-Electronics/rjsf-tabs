# tabs for react-jsonschema-form (rjsf)

This small package re-formats the contents of the react-jsonschema-form-pagination repository so as to be compatible with the latest version of the react-jsonschema-form project.

To use the package, use `npm install rjsf-tabs` and integrate it in your project as follows:

```
import validator from "@rjsf/validator-ajv6";
import Form from "@rjsf/core";

import applyNav from 'rjsf-tabs/applyNav'
import EditorNavs from './EditorNavs'


let FormWithNav = applyNav(Form)

```

Note that the `EditorNavs` is optional to allow you to create a custom tab structure, e.g. as follows:

```
import React from "react";
import { GENERIC_NAV } from "rjsf-tabs/utils";

function EditorNavs({ navs: { links }, onNavChange }) {
  let relLinks = links.filter(({ nav }) => nav !== GENERIC_NAV);
  return (
    <nav className="navbar navbar-default navbar-margin-reduce">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-ul-margin-reduce">
            {relLinks.map(({ nav, name, icon, isActive }, i) => (
              <li
                key={i}
                onClick={() => onNavChange(nav)}
                className={isActive ? "active bottom-border" : null}
              >
                <a className={isActive ? "nav-active" : null}>
                  {icon && <span className={icon} aria-hidden="true" />}
                  &nbsp;{name || nav}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default EditorNavs;


```
