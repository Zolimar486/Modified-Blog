const validateUsername = ({username, setUsernameError})=>{
     return username && username.length < 3 ? setUsernameError("Username is too Short"): setUsernameError("")
}

const validatePassword= ({password, setPasswordError})=> {
    return password && password.length < 7 ? setPasswordError("Password  too Weak") : setPasswordError("")

}

const validateEmail = ({email, setEmailError}) => {
    const regular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return email && !email.match(regular) ? setEmailError("Email is invalid ") : setEmailError("")
}

export{validateUsername, validatePassword, validateEmail}