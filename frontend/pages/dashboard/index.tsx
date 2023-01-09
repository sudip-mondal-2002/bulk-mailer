import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";
import {UseTemplatesHook} from "../../hooks/useTemplatesHook";

export default function Dashboard() {
    const {profile} = UseAuthHook()
    const {templates, errors} = UseTemplatesHook()
    if (!profile) {
        return <div className="dashboard">
            <div className="Loading">Loading</div>
        </div>
    }
    return <div className="dashboard">
        {
            templates.map((t, i) => {
                    return <div key={i} className="template">
                        <div className="title">
                            {t.name}
                        </div>
                    </div>
                }
            )
        }
    </div>
}
