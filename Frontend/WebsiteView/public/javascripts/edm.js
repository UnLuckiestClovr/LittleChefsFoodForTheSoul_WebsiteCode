try {
    const LoginView = document.getElementById('LoginView')
    const RegisterView = document.getElementById('RegisterView')
    const RegSwitch = document.getElementById('regViewSwitch')
    const LoginSwitch = document.getElementById('logViewSwitch')

    LoginSwitch.addEventListener('click', function () {
        changeViewtoLogin()
    })

    RegSwitch.addEventListener('click', function () {
        changeViewtoRegister()
    })

    function changeViewtoLogin() {
        LoginView.style.display = "block"
        RegisterView.style.display = "none"
    }

    function changeViewtoRegister() {
        RegisterView.style.display = "block"
        LoginView.style.display = "none"
    }
} catch (error) {
    
}

// Login / Register Scripts
async function LoginInvalid(outputBox) {
    outputBox.innerHTML = "Login Unsuccessful: Username or Password Incorrect"
}

try {
    document.getElementById('loginBTN').addEventListener('click', async () => {
        const uName = await document.getElementById('uLogin').value
        const uPswrd = await document.getElementById('pLogin').value
        const LoginOutputBox = await document.getElementById('OutputBox')

        console.log("User Input: ", {uName, uPswrd})

        if(uName === "" || uPswrd === "") {
            LoginOutputBox.innerHTML = 'Inputs Cannot Be Empty'
            return
        }

        const attempt = {
            username: uName,
            password: uPswrd
        }

        try {
            const response = await fetch('/loginorregister/loginAttempt', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attempt)
            })

            if(response.ok) {
                console.log("Login Successful")
                relativeUsername = uName
                window.location.href = "/profile"
            } else {
                LoginInvalid(LoginOutputBox)
                console.log("Login Failure")
            }
        } catch (error) {
            //console.log(error)
        }
    })
} catch (error) {
    
}

try {
    document.getElementById('registerBTN').addEventListener('click', async() => {
        const uName = await document.getElementById('uReg').value
        const uPswrd = await document.getElementById('pReg').value
        const uEmail = await document.getElementById('eReg').value
        const uFullName = await document.getElementById('nReg').value
        const RegOutputBox = await document.getElementById('OutputBox')

        if(uName === "" || uPswrd === "" || uEmail === "" || uFullName === "") {
            RegOutputBox.innerHTML = "<p> Profile Inputs cannot be Empty. </p>"
            return
        }
        RegOutputBox.innerHTML = ""

        const newUser = {
            Username: uName,
            Password: uPswrd,
            Email: uEmail,
            FullName: uFullName,
        }

        console.log(newUser)

        try {
            const response = await fetch('/loginorregister/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            console.log(response)
            
            if(response.ok) {
                relativeUsername = uName
                window.location.href = "/loginorregister"
            } else {
                console.log("Registry Failure")
            }
        } catch (error) {
            console.log(error)
        }
    })
} catch (error) {

}