import React, { useState } from "react";

export default function Register(props) {
    let [name, setName] = useState();
    return <div className="Register">
        <input name="username" placeholder="username" onChange={e => setName(e.target.value)} />
        <button onClick={() => props.onRegister(name)}>Join</button>
    </div>
}