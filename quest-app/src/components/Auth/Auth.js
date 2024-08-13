import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

function Auth(){

    return(
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input></Input>
            <InputLabel style={{top:80}}>Password</InputLabel>
            <Input style={{top:80}}></Input>

        </FormControl>
    )
}

export default Auth;

